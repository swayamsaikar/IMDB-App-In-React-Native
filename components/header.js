import React, { Component } from "react";
import { Header } from "react-native-elements";

export default class MyHeader extends Component {
  render() {
    return (
      <Header
        centerComponent={{
          text: this.props.title,
          style: { fontSize: 20, color: "#fff", fontWeight: "bold" },
        }}
      />
    );
  }
}
