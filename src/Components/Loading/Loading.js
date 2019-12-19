import React, { Component } from "react";
import { Ellipsis } from 'react-awesome-spinners'

export default class Loading extends Component {
  render() {
    return (
          <Ellipsis color="#888888" role="status" position="center"/>
    );
  }
}