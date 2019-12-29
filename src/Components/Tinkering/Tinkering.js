import React, { Component } from "react";
import "./Tinkering.css";



export default class tinkering extends Component {

    componentDidMount() {
        for (var i=0; i< 64; i++){
            let newCell = document.getElementById("mainChessBoard").appendChild(document.createElement("div"))

            newCell.style.backgroundColor = (parseInt((i / 8) + i) % 2 === 0 ? 'white' : '#ababab')
            
            // newCell.className = "test"
            newCell.className = (parseInt((i / 8) + i) % 2 === 0 ? 'white' : 'black')
            newCell.id = `${i}`
        }
    }

    
    render() {
        return (
        <div className="tinkering">
            <div id="mainChessBoard">
            </div>

            <div className="border-letters">
                <div className="bottom-letters">
                    <h1>A</h1>
                    <h1>B</h1>
                    <h1>C</h1>
                    <h1>D</h1>
                    <h1>E</h1>
                    <h1>F</h1>
                    <h1>G</h1>
                    <h1>H</h1>
                </div>
                <div className="left-numbers">
                    <h1>8</h1>
                    <h1>7</h1>
                    <h1>6</h1>
                    <h1>5</h1>
                    <h1>4</h1>
                    <h1>3</h1>
                    <h1>2</h1>
                    <h1>1</h1>
                </div>
            </div>
        </div>
        );
    }
}


