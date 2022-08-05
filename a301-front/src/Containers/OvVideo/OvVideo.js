import React, { Component } from "react";
import styles from "./OvVideo.module.css";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).닉네임;
  }

  render() {
    return (
      <div className={styles.labeledVideo}>
        <p className={styles.label}>{this.getNicknameTag()}</p>
        <video
          className={styles.singleVideo}
          autoPlay={true}
          ref={this.videoRef}
          label={this.getNicknameTag()}
        />
      </div>
    );
  }
}
