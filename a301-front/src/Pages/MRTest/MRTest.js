import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component, useEffect, useState } from "react";
import styles from "./MRTest.module.css";
import {
  MeetingFooter,
  ParticipantBlock,
  ChatBlock,
  UserVideoComponent,
} from "../../Containers";
import { Typography, TextField, Stack, Alert } from "@mui/material";
import { Abc } from "@mui/icons-material";

const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const MRTest = (props) => {
  const [mySessionId, setMySessionId] = useState("SessionA");
  const [myUserName, setMyUserName] = useState(
    "Participant" + Math.floor(Math.random() * 100)
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
  // let OV;
  useEffect(() => {
    window.addEventListener("beforeunload", beforeunload);
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
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
  }, [subscribers]);
  const listenMessage = () => {
    session.on("signal", (event) => {
      setMessage(event.data);
      console.log(event.data);
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
        // setMyUserName("haaaa");
      });
      listenMessage();
      // On every Stream destroyed...
      mySession.on("streamDestroyed", (event) => {
        // Remove the stream from 'subscribers' array
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
          .connect(token, { clientData: myUserName })
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
      mySession.disconnect();
    }
    // return (
    //   <>
    //     {this.state.session === undefined ? (
    //       <div id={styles.join} className="container">
    //         <div
    //           id={styles["join-dialog"]}
    //           className="jumbotron vertical-center"
    //         >
    //           <Typography variant="h3" component="h2">
    //             Join a video session
    //           </Typography>
    //           <br />
    //           <form className="form-group" onSubmit={this.joinSession}>
    //             <p>
    //               <Typography variant="label" component="h2">
    //                 Participant:&nbsp;
    //                 <TextField
    //                   className="form-control"
    //                   type="text"
    //                   id="userName"
    //                   value={myUserName}
    //                   onChange={this.handleChangeUserName}
    //                   required
    //                   color="success"
    //                   size="small"
    //                 />
    //               </Typography>
    //             </p>
    //             <p>
    //               <Typography variant="label" component="h2">
    //                 Session:&nbsp;
    //                 <TextField
    //                   className="form-control"
    //                   type="text"
    //                   id="sessionId"
    //                   value={mySessionId}
    //                   onChange={this.handleChangeSessionId}
    //                   disabled
    //                   color="success"
    //                   size="small"
    //                 />
    //               </Typography>
    //             </p>
    //             <p className="text-center">
    //               <input
    //                 className={styles.btn}
    //                 name="commit"
    //                 type="submit"
    //                 value="JOIN"
    //               />
    //             </p>
    //           </form>
    //         </div>
    //       </div>
    //     ) : null}

    //     {this.state.session !== undefined ? (
    //       <div>
    //         <Stack
    //           direction="row"
    //           justifyContent="space-between"
    //           alignItems="center"
    //           flexWrap="wrap"
    //           spacing={0}
    //           padding="10px"
    //         >
    //           <div id={styles["video-container"]} className="col-md-6">
    //             {this.state.publisher !== undefined ? (
    //               <div
    //                 className="stream-container col-md-6 col-xs-6"
    //                 onClick={() =>
    //                   this.handleMainVideoStream(this.state.publisher)
    //                 }
    //               >
    //                 <UserVideoComponent streamManager={this.state.publisher} />
    //               </div>
    //             ) : null}
    //             {this.state.subscribers.map((sub, i) => (
    //               <div
    //                 key={i}
    //                 className="stream-container col-md-6 col-xs-6"
    //                 onClick={() => this.handleMainVideoStream(sub)}
    //               >
    //                 <UserVideoComponent streamManager={sub} />
    //               </div>
    //             ))}
    //           </div>
    //           <Stack
    //             direction="column"
    //             justifyContent="flex-start"
    //             alignItems="flex-end"
    //             spacing={0}
    //           >
    //             <ParticipantBlock
    //               openChat={this.state.openChat}
    //               openParticipant={this.state.openParticipant}
    //             />
    //             <ChatBlock
    //               openChat={this.state.openChat}
    //               openParticipant={this.state.openParticipant}
    //               myUserName={this.state.myUserName}
    //               mainStreamManager={this.state.mainStreamManager}
    //               session={this.state.session}
    //             />
    //           </Stack>
    //         </Stack>
    //         <MeetingFooter
    //           openChat={this.state.openChat}
    //           openParticipant={this.state.openParticipant}
    //           micOn={this.state.micOn}
    //           cameraOn={this.state.cameraOn}
    //           setOpenChat={this.setOpenChat}
    //           setOpenParticipant={this.setOpenParticipant}
    //           setMicOn={this.setMicOn}
    //           setCameraOn={this.setCameraOn}
    //           leaveSession={this.leaveSession}
    //         />
    //       </div>
    //     ) : null}
    //   </>
    setOV(null);
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };
  const switchCamera = async () => {
    try {
      const devices = await OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: false,
            publishVideo: false,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await session.unpublish(mainStreamManager);
          await session.publish(newPublisher);
          setCurrentVideoDevice(newVideoDevice);
          setMainStreamManager(newPublisher);
          setPublisher(newPublisher);
        }
      }
    } catch (e) {
      console.error(e);
    }
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
  const sendMessage = (aaa) => {
    session.signal({
      data: `{"name":"${myUserName}","text":"${aaa}"}`,
      to: [],
      type: "chat",
    });
    console.log(session);
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
                <Typography variant="label" component={"span"}>
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
                <Typography variant="label" component={"span"}>
                  Session:&nbsp;
                  <TextField
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={handleChangeSessionId}
                    disabled
                    color="success"
                    size="small"
                  />
                </Typography>
              </p>
              <p className="text-center">
                <input
                  className={styles.btn}
                  name="commit"
                  type="submit"
                  value="JOIN"
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
            flexWrap="wrap"
            spacing={0}
            padding="10px"
          >
            <div id={styles["video-container"]} className="col-md-6">
              {publisher !== undefined ? (
                <div
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => handleMainVideoStream(publisher)}
                >
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : null}
              {subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-end"
              spacing={0}
            >
              <ParticipantBlock
                openChat={openChat}
                openParticipant={openParticipant}
              />
              <ChatBlock
                sendMessage={sendMessage}
                message={message}
                openChat={openChat}
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

export default MRTest;
