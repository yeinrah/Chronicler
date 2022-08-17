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
import destroyRoom from "../../Api/destroyRoom";
import { Typography, TextField, Stack, Alert } from "@mui/material";
import { Abc } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import showNavState from "../../recoil/atoms/showNavState";
import { useLocation, useNavigate } from "react-router-dom";
import userInfoState from "../../recoil/atoms/userInfoState";
import roomCreate from "../../Api/roomCreate";
import roomJoin from "../../Api/roomJoin";
import roomLeave from "../../Api/roomLeave";
import Swal from "sweetalert2";
import userLoginedState from "../../recoil/atoms/userLoginedState";

const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const MeetingRoom = (props) => {
  const [mySessionId, setMySessionId] = useState(
    new Date().getTime().toString(36)
  );
  const [myUserName, setMyUserName] = useState("");
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
  const [subtitle, setSubtitle] = useState();
  const [speechRecord, setSpeechRecord] = useState();
  const [speechRecords, setSpeechRecords] = useState([]);
  const [finalRecords, setFinalRecords] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [people, setPeople] = useState(subscribers.length);
  const [participant, setPartcipant] = useState([]);
  const [isMain, setIsMain] = useState();
  // const [endSession, setEndSession] = useState(false);
  const [isShownNavState, setIsShownNavState] = useRecoilState(showNavState);
  const [myUid, setMyUid] = useRecoilState(userInfoState);
  const [nowLogined, setNowLogined] = useRecoilState(userLoginedState);
  const navigate = useNavigate();
  const { state } = useLocation();
  // let OV;
  useEffect(() => {
    if (!nowLogined) {
      Swal.fire("로그인 해주세요");
      navigate("/main");
    }
    window.addEventListener("beforeunload", beforeunload);
    setIsShownNavState(false);
    if (state) setMySessionId(state);
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
    let SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    if (micOn) {
      recognition.interimResults = true;
      recognition.continuous = true;
      let temp = "";

      recognition.addEventListener("result", (e) => {
        const transcript = Array.from(e.results)
          .map((result) => result[0])
          .map((result) => result.transcript);

        // convert_text.innerHTML = transcript;
        console.log(transcript);
        console.log(typeof transcript);
        console.log(transcript[transcript.length - 1]);
        sendSpeechRecord(transcript[transcript.length - 1]);
        // console.log(speechRecord + transcript["0"]);
        // setSpeechRecord(speechRecord + transcript["0"]);

        // console.log(`speechRecord: ${JSON.parse(speechRecord)}`);
        // console.log(`speechRecords: ${speechRecords}`);

        // setSubtitle(transcript["0"]);
      });
      recognition.start();
    }
    return () => {
      recognition.stop();
      setSubtitle("");
    };
  }, [micOn]);
  useEffect(() => {
    if (speechRecords[speechRecords.length - 1]) {
      setSubtitle(
        speechRecords[speechRecords.length - 1].name +
          " : " +
          speechRecords[speechRecords.length - 1].text
      );
      console.log(speechRecords);
    }
  }, [speechRecords]);

  useEffect(() => {
    if (speechRecord) {
      console.log(speechRecords[speechRecords.length - 1]);
      if (speechRecords[speechRecords.length - 1]) {
        if (
          JSON.parse(speechRecord).text.includes(
            speechRecords[speechRecords.length - 1].text
          ) ||
          JSON.parse(speechRecord).text[0] ===
            speechRecords[speechRecords.length - 1].text[0] ||
          JSON.parse(speechRecord).text[1] ===
            speechRecords[speechRecords.length - 1].text[1]
        ) {
          console.log(speechRecords[speechRecords.length - 1].text);
          setSpeechRecords([
            ...speechRecords.slice(0, -1),
            JSON.parse(speechRecord),
          ]);
        } else {
          setSpeechRecords([...speechRecords, JSON.parse(speechRecord)]);
        }
        // if (speechRecords[speechRecords.length - 1]) {
        //   console.log(speechRecords[speechRecords.length - 1].text);
        //   console.log(typeof speechRecords[speechRecords.length - 1].text);
        //   console.log(speechRecords[speechRecords.length - 1].text[1]);
        // }
        // if (speechRecord) {
        //   console.log(JSON.parse(speechRecord).text);
        //   console.log(JSON.parse(speechRecord).text[0]);
        // }
      } else {
        setSpeechRecords([...speechRecords, JSON.parse(speechRecord)]);
      }
    }
    // if (speechRecord) {
    //   setSpeechRecords([...speechRecords, JSON.parse(speechRecord)]);
    // }
  }, [speechRecord]);

  useEffect(() => {
    setMyUserName(myUid.nickname);
    listenScriber();
  }, [session]);
  useEffect(() => {
    let participantNow = [];
    if (session) {
      if (session.streamManagers.length === 1) {
        setIsMain(true);
      }
      if (session.streamManagers[0].session) {
        setIsMain(true);
      } else if (!session.streamManagers[0].session) {
        setIsMain(false);
      } else {
      }
      setPartcipant([]);
      session.streamManagers.map((item, i) => {
        if (item.session) {
          participantNow.push(item.session.connection.data);
          // setPartcipant([...participant, item.session.connection.data]);
        } else if (item.stream) {
          participantNow.push(item.stream.connection.data);
          // setPartcipant([...participant, item.stream.connection.data]);
        }
      });
      setPartcipant([...participantNow]);
    }
  }, [subscribers, publisher]);
  useEffect(() => {
    let token = localStorage.getItem("access-token");
    if (isMain) {
      roomCreate.post(
        `/conference/${myUid.id}`,
        {
          conferenceCode: mySessionId,
        },
        {
          headers: {
            "access-token": token,
          },
        }
      );
    } else if (!isMain) {
      roomJoin.post(
        `/conference/enter/${myUid.id}`,
        {
          conference_code: mySessionId,
          nickname: myUserName,
        },
        {
          headers: {
            "access-token": token,
          },
        }
      );
    }
  }, [isMain]);
  const listenMessage = () => {
    session.on("signal:chat", (event) => {
      setMessage([event.data]);
    });
  };
  const listenSpeech = () => {
    session.on("signal:speech", (event) => {
      setSpeechRecord(event.data);
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
    });
  };
  const listenEndSession = () => {
    session.on("signal:endSession", (event) => {
      leaveSession();
    });
  };
  const listenScriber = () => {
    if (session) {
      var mySession = session;
      // --- 3) Specify the actions when events take place in the session ---
      // On every new Stream received...

      mySession.on("streamCreated", (event) => {
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        var subscriber1 = mySession.subscribe(event.stream, undefined);
        var subscribersNow = subscribers;
        subscribersNow.push(subscriber1);
        // Update the state with the new subscribers
        setSubscribers([...subscribersNow]);
        setPeople(subscribers.length);
      });

      listenMessage();
      listenSpeech();
      listenEndSession();
      // On every Stream destroyed...
      mySession.on("streamDestroyed", (event) => {
        // Remove the stream from 'subscribers' array
        // setEndSession(true);

        // leaveSession();
        deleteSubscriber(event.stream.streamManager);
      });

      mySession.on("publisherStartSpeaking", (event) => {
        setIsSpeaking(true);
      });

      mySession.on("publisherStopSpeaking", (event) => {
        setIsSpeaking(false);
        window.webkitSpeechRecognition().stop();
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
            OV.getUserMedia({
              audioSource: false,
              videoSource: undefined,
              resolution: "640x480",
              frameRate: 30,
            }).then((mediaStream) => {
              var videoTrack = mediaStream.getVideoTracks()[0];

              var publisher = OV.initPublisher(userInfoState.myUserName, {
                audioSource: undefined,
                videoSource: videoTrack,
                publishAudio: false,
                publishVideo: false,
                // resolution: '1280x720',
                // frameRate: 10,
                insertMode: "APPEND",
                mirror: true,
              });
              mySession.publish(publisher);
              // Set the main video in the page to display our webcam and store our Publisher
              setCurrentVideoDevice(videoTrack);
              setMainStreamManager(publisher);
              setPublisher(publisher);
            });
            // var videoDevices = devices.filter(
            //   (device) => device.kind === "videoinput"
            // );
            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties

            // let publisher = OV.initPublisher(undefined, {
            //   audioSource: undefined, // The source of audio. If undefined default microphone
            //   videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            //   publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
            //   publishVideo: false, // Whether you want to start publishing with your video enabled or not
            //   resolution: "640x480", // The resolution of your video
            //   frameRate: 30, // The frame rate of your video
            //   insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            //   mirror: false, // Whether to mirror your local video or not
            // });

            // --- 6) Publish your stream ---

            // mySession.publish(publisher);
            // console.log(publisher);
            // // Set the main video in the page to display our webcam and store our Publisher
            // setCurrentVideoDevice(videoDevices[0]);
            // setMainStreamManager(publisher);
            // setPublisher(publisher);
          })
          .catch((error) => {
            console.log(
              "There was an error connecting to the session:",
              error.code,
              error.message,
              error.message,
              error.speechRecord
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

    a.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 100, // Frequency of the polling of audio streams in ms (default 100)
        threshold: -50, // Threshold volume in dB (default -50)
      },
    });
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
    setMicOn(false);
    setCameraOn(false);
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId(mySessionId);
    setMyUserName(myUid.nickname);
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setPartcipant([]);
  };
  const destroySession = () => {
    console.log(
      speechRecords.filter(
        (item, idx) =>
          (idx < speechRecords.length - 1 &&
            item.text.length > 2 &&
            !speechRecords[idx + 1].text.includes(item.text) &&
            !(
              speechRecords[idx + 1].text[0] === item.text[0] &&
              speechRecords[idx + 1].text[1] === item.text[1]
            ) &&
            idx < speechRecords.length - 2 &&
            !speechRecords[idx + 2].text.includes(item.text) &&
            !(
              speechRecords[idx + 2].text[0] === item.text[0] &&
              speechRecords[idx + 2].text[1] === item.text[1]
            )) ||
          idx === speechRecords.length - 1 ||
          idx === speechRecords.length - 2
      )
    );
    // console.log(typeof speechRecords);
    // console.log(typeof speechRecords[0]);
    // setFinalRecords(
    //   speechRecords.filter(
    //     (item, idx) =>
    //       (idx < speechRecords.length - 1 &&
    //         item.text.length > 2 &&
    //         !speechRecords[idx + 1].text.includes(item.text) &&
    //         !(
    //           speechRecords[idx + 1].text[0] === item.text[0] &&
    //           speechRecords[idx + 1].text[1] === item.text[1]
    //         ) &&
    //         idx < speechRecords.length - 2 &&
    //         !speechRecords[idx + 2].text.includes(item.text) &&
    //         !(
    //           speechRecords[idx + 2].text[0] === item.text[0] &&
    //           speechRecords[idx + 2].text[1] === item.text[1]
    //         )) ||
    //       idx === speechRecords.length - 1 ||
    //       idx === speechRecords.length - 2
    //   )
    // );
    const mySession = session;

    if (mySession) {
      destroySessionApi(
        speechRecords.filter(
          (item, idx) =>
            (idx < speechRecords.length - 1 &&
              item.text.length > 2 &&
              !speechRecords[idx + 1].text.includes(item.text) &&
              !(
                speechRecords[idx + 1].text[0] === item.text[0] &&
                speechRecords[idx + 1].text[1] === item.text[1]
              ) &&
              idx < speechRecords.length - 2 &&
              !speechRecords[idx + 2].text.includes(item.text) &&
              !(
                speechRecords[idx + 2].text[0] === item.text[0] &&
                speechRecords[idx + 2].text[1] === item.text[1]
              )) ||
            idx === speechRecords.length - 1 ||
            idx === speechRecords.length - 2
        )
      );
      sendEndSession();
      mySession.disconnect();
    }
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId(mySessionId);
    setMyUserName(myUid.nickname);
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setPartcipant([]);
    // console.log(finalRecords);

    // leaveRoomApi();
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
          // console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `openvidu server error ${OPENVIDU_SERVER_URL}`,
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/main");
              }
            });
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
          // console.log("TOKEN", response);
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
  };
  const sendSpeechRecord = (s) => {
    session.signal({
      data: `{"name":"${myUserName}","text":"${s}"}`,
      to: [],
      type: "speech",
    });
  };
  const sendEndSession = () => {
    session.signal({
      data: "",
      to: [],
      type: "endSession",
    });
    Swal.fire({
      title: "이메일로 회의록이 전송되었습니다.",
      text: "메일 도착까지 약간의 시간이 소요될 수 있습니다.(대화가 없을 때는 전송되지 않습니다)",
      confirmButtonText: "확인",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/main");
      }
    });
  };
  const leaveRoomApi = () => {
    let token = localStorage.getItem("access-token");
    roomLeave
      .put(
        `/conference/${mySessionId}`,
        {
          id: myUid.id,
        },
        {
          headers: {
            "access-token": token,
          },
        }
      )
      .then(() => {
        Swal.fire({
          title: "회의가 종료되었습니다.",
          confirmButtonText: "확인",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            navigate("/main");
          }
        });
        console.log("leave room success");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const destroySessionApi = (data) => {
    let token = localStorage.getItem("access-token");
    destroyRoom
      .put(
        `/conference/${mySessionId}`,
        {
          chronicleData: data,
          id: myUid.id,
        },
        {
          headers: {
            "access-token": token,
          },
        }
      )
      .then(() => {
        console.log("destroy room success");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {session === undefined ? (
        <div id={styles.join} className="container">
          <div id={styles["join-dialog"]} className="jumbotron vertical-center">
            <Typography
              variant="h3"
              component={"span"}
              sx={{ fontFamily: "Song Myung" }}
            >
              Join a video session
            </Typography>
            <br />
            <form className="form-group" onSubmit={joinSession}>
              <div>
                <Typography variant="label" component={"h2"}>
                  Participant:&nbsp;
                  <TextField
                    className={styles.formCont}
                    type="text"
                    id="userName"
                    disabled
                    value={myUserName}
                    onChange={handleChangeUserName}
                    required
                    color="success"
                    size="small"
                  />
                </Typography>
              </div>
              <div>
                <Typography variant="label" component={"h2"}>
                  Session:&nbsp;
                  <TextField
                    className={styles.formCont}
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
              </div>
              <div className={styles["text-center"]}>
                <input
                  className={styles.btn}
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
                <input
                  className={styles.btnBack}
                  onClick={() => {
                    navigate("/main");
                  }}
                  name="commit"
                  type="button"
                  value="Back"
                />
              </div>
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
            subtitle={subtitle}
            leaveSession={leaveSession}
            destroySession={destroySession}
            isMain={isMain}
            sessionId={mySessionId}
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
 *   1) Initialize a Session in OpenVidu Server    (POST /openvidu/api/sessions)
 *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
 *   3) The Connection.token must be consumed in Session.connect() method
 */

export default MeetingRoom;
