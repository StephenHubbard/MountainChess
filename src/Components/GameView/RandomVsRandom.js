import React, { Component } from "react";

import RandomVsRandomGame from "./RandomVsRandomGame";

class RandomVsRandom extends Component {
    render() {
        return (
        <div>
            <div style={boardsContainer}>
            <RandomVsRandomGame />
            </div>
        </div>
        );
    }
    }

    export default RandomVsRandom;

    const boardsContainer = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: "20vw",
    margin: 30,
    };