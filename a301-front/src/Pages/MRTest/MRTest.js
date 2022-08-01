import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import styles from "./MRTest.module.css";
import {
  MeetingFooter,
  ParticipantBlock,
  ChatBlock,
  UserVideoComponent,
} from "../../Containers";
import { Typography, TextField, Stack } from "@mui/material";

const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

class MRTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      openChat: false,
      openParticipant: false,
      micOn: false,
      cameraOn: false,
    };

    this.setOpenChat = this.setOpenChat.bind(this);
    this.setOpenParticipant = this.setOpenParticipant.bind(this);
    this.setMicOn = this.setMicOn.bind(this);
    this.setCameraOn = this.setCameraOn.bind(this);
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  setOpenChat(e) {
    this.setState({
      openChat: e,
    });
  }
  setOpenParticipant(e) {
    this.setState({
      openParticipant: e,
    });
  }
  setMicOn(e) {
    this.setState({
      micOn: e,
    });
    this.state.publisher.publishAudio(e);
  }
  setCameraOn(e) {
    this.setState({
      cameraOn: e,
    });
    this.state.publisher.publishVideo(e);
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        let mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          let subscriber = mySession.subscribe(event.stream, undefined);
          let subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken().then((token) => {
          // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              let devices = await this.OV.getDevices();
              let videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );

              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = this.OV.initPublisher(undefined, {
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
              this.setState({
                currentVideoDevice: videoDevices[0],
                mainStreamManager: publisher,
                publisher: publisher,
              });
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
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <>
        {this.state.session === undefined ? (
          <div id={styles.join} className="container">
            <div
              id={styles["join-dialog"]}
              className="jumbotron vertical-center"
            >
              <Typography variant="h3" component="h2">
                Join a video session
              </Typography>
              <br />
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <Typography variant="label" component="h2">
                    Participant:&nbsp;
                    <TextField
                      className="form-control"
                      type="text"
                      id="userName"
                      value={myUserName}
                      onChange={this.handleChangeUserName}
                      required
                      color="success"
                      size="small"
                    />
                  </Typography>
                </p>
                <p>
                  <Typography variant="label" component="h2">
                    Session:&nbsp;
                    <TextField
                      className="form-control"
                      type="text"
                      id="sessionId"
                      value={mySessionId}
                      onChange={this.handleChangeSessionId}
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

        {this.state.session !== undefined ? (
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
                {this.state.publisher !== undefined ? (
                  <div
                    className="stream-container col-md-6 col-xs-6"
                    onClick={() =>
                      this.handleMainVideoStream(this.state.publisher)
                    }
                  >
                    <UserVideoComponent streamManager={this.state.publisher} />
                  </div>
                ) : null}
                {this.state.subscribers.map((sub, i) => (
                  <div
                    key={i}
                    className="stream-container col-md-6 col-xs-6"
                    onClick={() => this.handleMainVideoStream(sub)}
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
                  openChat={this.state.openChat}
                  openParticipant={this.state.openParticipant}
                />
                <ChatBlock
                  openChat={this.state.openChat}
                  openParticipant={this.state.openParticipant}
                  myUserName={this.state.myUserName}
                  mainStreamManager={this.state.mainStreamManager}
                  session={this.state.session}
                />
              </Stack>
            </Stack>
            <MeetingFooter
              openChat={this.state.openChat}
              openParticipant={this.state.openParticipant}
              micOn={this.state.micOn}
              cameraOn={this.state.cameraOn}
              setOpenChat={this.setOpenChat}
              setOpenParticipant={this.setOpenParticipant}
              setMicOn={this.setMicOn}
              setCameraOn={this.setCameraOn}
              leaveSession={this.leaveSession}
            />
          </div>
        ) : null}
      </>
    );
  }

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

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
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
  }

  createToken(sessionId) {
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
  }
}

export default MRTest;
