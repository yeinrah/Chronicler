import axios from "axios";
import { OpenVidu, Publisher, Subscriber } from "openvidu-browser";
import React, { Component, useEffect, useState } from "react";
import styles from "./MeetingRoom.module.css";
import {
  MeetingFooter,
  ParticipantBlock,
  ChatBlock,
  UserVideoComponent,
} from "../../Containers";
import destroySessionApi from "../../Api/destroySessionApi";
import { Typography, TextField, Stack, Alert } from "@mui/material";
import { Abc } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import showNavState from "../../recoil/atoms/showNavState";
import { useNavigate } from "react-router-dom";
import userInfoState from "../../recoil/atoms/userInfoState";
import roomCreate from "../../Api/roomCreate";
import roomJoin from "../../Api/roomJoin";
import roomLeave from "../../Api/roomLeave";

const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const MeetingRoom = (props) => {
  const [mySessionId, setMySessionId] = useState(
    new Date().getTime().toString(36)
  );
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 10000)
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [openChat, setOpenChat] = useState(false);
  const [openParticipant, setOpenParticipant] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [currentVideoDevice, setCurrentVideoDevice] = useState();
  const [OV, setOV] = useState(undefined);
  const [message, setMessage] = useState();
  const [people, setPeople] = useState(subscribers.length);
  const [participant, setPartcipant] = useState([]);
  const [isMain, setIsMain] = useState();
  // const [endSession, setEndSession] = useState(false);
  const [isShownNavState, setIsShownNavState] = useRecoilState(showNavState);
  const [myUid, setMyUid] = useRecoilState(userInfoState);
  const navigate = useNavigate();
  // let OV;
  useEffect(() => {
    window.addEventListener("beforeunload", beforeunload);
    setIsShownNavState(false);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
      leaveSession();
      setIsShownNavState(true);
    };
  }, []);
  useEffect(() => {
    if (OV) {
      setSession(OV.initSession());
    }
  }, [OV]);
  useEffect(() => {
    listenScriber();
  }, [session]);
  useEffect(() => {
    console.log("subscribes.change");
    let participantNow = [];
    if (session) {
      console.log(session.streamManagers.length);
      if (session.streamManagers.length === 1) {
        console.log("im main");
        setIsMain(true);
      }
      console.log("dasdasd!!@E!@#!@#!");
      console.log(session);
      console.log(session.streamManagers);
      console.log(session.streamManagers[0]);
      if (session.streamManagers[0].session) {
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
        setIsMain(true);
      } else if (!session.streamManagers[0].session) {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        setIsMain(false);
      } else {
        console.log("#############################");
      }
      console.log(session.streamManagers.length);
      setPartcipant([]);
      session.streamManagers.map((item, i) => {
        console.log("haDQE!@#!");
        console.log(item);
        if (item.session) {
          console.log(item.session.connection.data);
          participantNow.push(item.session.connection.data);
          // setPartcipant([...participant, item.session.connection.data]);
        } else if (item.stream) {
          console.log(item.stream.connection.data);
          participantNow.push(item.stream.connection.data);
          // setPartcipant([...participant, item.stream.connection.data]);
        }
      });
      setPartcipant([...participantNow]);
    }
  }, [subscribers, publisher]);
  useEffect(() => {
    if (isMain) {
      roomCreate
        .post(`/conference/${myUid.id}`, {
          nickname: myUserName,
          conference_code: mySessionId,
        })
        .then(() => {
          console.log("myssssssssssssssssssssssssssssssseeeesion");
        });
    } else if (!isMain) {
      roomJoin
        .post(`/conference/enter/${myUid.id}`, {
          nickname: myUserName,
          conference_code: mySessionId,
        })
        .then(() => {
          console.log("join!!!!!!!!!!!!!!");
        });
    }
  }, [isMain]);
  const listenMessage = () => {
    session.on("signal:chat", (event) => {
      console.log("%%%%%%%%%%%%%%%%%%%");
      console.log(event.data);
      setMessage([event.data]);
    });
  };
  // useEffect(() => {
  //   if (endSession) {
  //     navigate("/");
  //   }
  // }, [endSession]);
  const listenParticipant = () => {
    session.on("signal:participant", (event) => {
      setPartcipant(event.data);
      console.log(event.data);
    });
  };
  const listenEndSession = () => {
    session.on("signal:endSession", (event) => {
      leaveSession();
      navigate("/");
    });
  };

  const listenScriber = () => {
    if (session) {
      var mySession = session;
      // --- 3) Specify the actions when events take place in the session ---
      // On every new Stream received...
      console.log("statrt!!!!!!!!!!!!!!!!!");
      console.log(session);

      mySession.on("streamCreated", (event) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        var subscriber1 = mySession.subscribe(event.stream, undefined);
        var subscribersNow = subscribers;
        subscribersNow.push(subscriber1);
        // Update the state with the new subscribers
        setSubscribers([...subscribersNow]);
        setPeople(subscribers.length);
        console.log("Aaaaaaaaaaaaaaaaaaaa");
        console.log(isMain);
      });

      listenMessage();
      listenEndSession();
      // On every Stream destroyed...
      mySession.on("streamDestroyed", (event) => {
        // Remove the stream from 'subscribers' array
        // setEndSession(true);

        // leaveSession();
        deleteSubscriber(event.stream.streamManager);
      });

      // On every asynchronous exception...
      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      // --- 4) Connect to the session with a valid user token ---

      // 'getToken' method is simulating what your server-side should do.
      // 'token' parameter should be retrieved and returned by your own backend
      getToken().then((token) => {
        // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        mySession
          .connect(token, { 닉네임: myUserName })
          .then(async () => {
            var devices = await OV.getDevices();
            var videoDevices = devices.filter(
              (device) => device.kind === "videoinput"
            );
            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let publisher = OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
              publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: false, // Whether you want to start publishing with your video enabled or not
              resolution: "640x480", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---

            mySession.publish(publisher);
            console.log(publisher);
            // Set the main video in the page to display our webcam and store our Publisher
            setCurrentVideoDevice(videoDevices[0]);
            setMainStreamManager(publisher);
            setPublisher(publisher);
          })
          .catch((error) => {
            console.log(
              "There was an error connecting to the session:",
              error.code,
              error.message
            );
          });
      });
    }
  };
  const beforeunload = () => {
    leaveSession();
    setIsShownNavState(true);
  };

  const onSetMicOn = (e) => {
    setMicOn(e);
    publisher.publishAudio(e);
  };
  const onSetCameraOn = (e) => {
    setCameraOn(e);
    publisher.publishVideo(e);
  };
  const handleChangeSessionId = (e) => {
    setMySessionId(e.target.value);
  };
  const handleChangeUserName = (e) => {
    setMyUserName(e.target.value);
  };
  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };
  const deleteSubscriber = (streamManager) => {
    let subscribersNow = subscribers;
    let index = subscribersNow.indexOf(streamManager, 0);
    if (index > -1) {
      subscribersNow.splice(index, 1);
      setSubscribers(subscribersNow);
    }
    setPeople(subscribers.length);
  };
  const joinSession = (event) => {
    event.preventDefault();
    // --- 1) Get an OpenVidu object --
    // let OV = new OpenVidu();
    // this.OV = new OpenVidu();
    let a = new OpenVidu();
    setOV(a);
    // --- 2) Init a session ---
    // setState(OV.initSession())
    // let b = await OV.initSession();
    // setSession(b);
  };
  const leaveSession = () => {
    const mySession = session;

    if (mySession) {
      leaveRoomApi();
      mySession.disconnect();
    }
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId(new Date().getTime().toString(36));
    setMyUserName("Participant" + Math.floor(Math.random() * 10000));
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setPartcipant([]);
  };
  const destroySession = () => {
    leaveRoomApi();
    sendEndSession();
    // axios
    //   .delete(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + mySessionId, {
    //     headers: {
    //       Authorization:
    //         "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then(() => {
    //     navigate("/");
    //     console.log("success!!!!!!!!!!!!!!!!!!!!!1delete");
    //   })
    //   .catch((e) => {
    //     console.log("error!!!!");
    //     console.log(e);
    //   });
  };

  const getToken = () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  };
  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  };
  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };
  const sendMessage = (text) => {
    text = text.replace(/\"/gi, "");
    session.signal({
      data: `{"name":"${myUserName}","text":"${text}"}`,
      to: [],
      type: "chat",
    });
    console.log(session);
    console.log("message send");
  };
  const sendParticipant = () => {
    session.signal({
      data: `{"name":"${myUserName}"}`,
      to: [],
      type: "participant",
    });
    console.log(myUserName);
    console.log("send!!!!!!!!!!!!");
  };
  const sendEndSession = () => {
    session.signal({
      data: "",
      to: [],
      type: "endSession",
    });
  };
  const leaveRoomApi = () => {
    roomLeave
      .put(`/conference/${mySessionId}`, {
        id: myUid.id,
      })
      .then(() => {
        console.log("leave room success");
      });
  };
  return (
    <>
      {console.log(session)}
      {console.log(OV)}
      {session === undefined ? (
        <div id={styles.join} className="container">
          <div id={styles["join-dialog"]} className="jumbotron vertical-center">
            <Typography variant="h3" component={"span"}>
              Join a video session
            </Typography>
            <br />
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <Typography variant="label" component={"h2"}>
                  Participant:&nbsp;
                  <TextField
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={handleChangeUserName}
                    required
                    color="success"
                    size="small"
                  />
                </Typography>
              </p>
              <p>
                <Typography variant="label" component={"h2"}>
                  Session:&nbsp;
                  <TextField
                    className="form-control"
                    type="text"
                    id="sessionId"
                    // disabled
                    value={mySessionId}
                    onChange={handleChangeSessionId}
                    required
                    color="success"
                    size="small"
                  />
                </Typography>
              </p>
              <p className={styles["text-center"]}>
                <input
                  className={styles.btn}
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
                <input
                  className={styles.btn}
                  onClick={() => {
                    navigate("/");
                  }}
                  name="commit"
                  type="button"
                  value="Back"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null}
      {session !== undefined ? (
        <div>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
          >
            <div id={styles["video-container"]}>
              {publisher !== undefined ? (
                <div
                  className={
                    people < 6
                      ? people < 2
                        ? styles["stream-container-dual"]
                        : styles["stream-container-less"]
                      : styles["stream-container-many"]
                  }
                  onClick={() => {
                    handleMainVideoStream(publisher);
                  }}
                >
                  <UserVideoComponent
                    streamManager={publisher}
                    people={subscribers.length}
                  />
                </div>
              ) : null}
              {subscribers.map((sub, i) => (
                <div
                  key={i}
                  className={
                    people < 6
                      ? people < 2
                        ? styles["stream-container-dual"]
                        : styles["stream-container-less"]
                      : styles["stream-container-many"]
                  }
                  onClick={() => handleMainVideoStream(sub)}
                >
                  <UserVideoComponent
                    streamManager={sub}
                    people={subscribers.length}
                  />
                </div>
              ))}
            </div>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-end"
              spacing={0}
              height="80vh"
            >
              <ParticipantBlock
                people={people}
                participants={participant}
                openChat={openChat}
                openParticipant={openParticipant}
                setOpenParticipant={setOpenParticipant}
              />
              <ChatBlock
                sendMessage={sendMessage}
                message={message}
                openChat={openChat}
                setOpenChat={setOpenChat}
                openParticipant={openParticipant}
              />
            </Stack>
          </Stack>
          <MeetingFooter
            openChat={openChat}
            openParticipant={openParticipant}
            micOn={micOn}
            cameraOn={cameraOn}
            setOpenChat={setOpenChat}
            setOpenParticipant={setOpenParticipant}
            setMicOn={onSetMicOn}
            setCameraOn={onSetCameraOn}
            leaveSession={leaveSession}
            destroySession={destroySession}
            isMain={isMain}
          />
        </div>
      ) : null}
    </>
  );
};
/**
 * --------------------------
 * SERVER-SIDE RESPONSIBILITY
 * --------------------------
 * These methods retrieve the mandatory user token from OpenVidu Server.
 * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
 * the API REST, openvidu-java-client or openvidu-node-client):
 *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
 *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
 *   3) The Connection.token must be consumed in Session.connect() method
 */

export default MeetingRoom;
