import React, { Component } from "react";
import styles from "./UserVideoComponent.module.css";
import OpenViduVideoComponent from "../OvVideo/OvVideo";

export default class UserVideoComponent extends Component {
  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <OpenViduVideoComponent streamManager={this.props.streamManager} />
        ) : null}
      </div>
    );
  }
}
