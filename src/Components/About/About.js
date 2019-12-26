import React, { Component } from "react";
import "./About.css";



export default class About extends Component {
    

    render() {
        return (
        <div className="about-page">
            <h1>About Page</h1>
            
            <h3> Mountain Chess was a project built using React by four students at Dev Mountain in Lehi Utah, as part of a group project.  It was built using React, Nodejs, PostgreSQL, javascript, socketio, and other misc techs.  Not only did we build our own gaming engine, but we built a full stack application user interface.  Integrating users the ability to see other online users, a leaderboard, challenging and chatting with other users, adding friend functionality, and more. If you would like to learn more about the project, please don't hesitate to contact any of us here.</h3>            
            <></>
            <div className="names-cont">
                <div className="name">
                    <h2>Stephen Hubbard:</h2>
                    <img className="linkedin-logo" src="https://icons-for-free.com/iconfiles/png/512/linkedin+linkedin+logo+networking+social+media+icon-1320196081476022403.png" alt=""/>
                    <img className="github-logo" src="http://pngimg.com/uploads/github/github_PNG83.png" alt=""/>
                    <h2>stephen-hubbard.com</h2>
                </div>
                <div className="name">
                    <h2>Rob Reiss:</h2>
                    <img className="linkedin-logo" src="https://icons-for-free.com/iconfiles/png/512/linkedin+linkedin+logo+networking+social+media+icon-1320196081476022403.png" alt=""/>
                    <img className="github-logo" src="http://pngimg.com/uploads/github/github_PNG83.png" alt=""/>
                </div>
                <div className="name">
                    <h2>Lance Jenkins:</h2>
                    <img className="linkedin-logo" src="https://icons-for-free.com/iconfiles/png/512/linkedin+linkedin+logo+networking+social+media+icon-1320196081476022403.png" alt=""/>
                    <img className="github-logo" src="http://pngimg.com/uploads/github/github_PNG83.png" alt=""/>
                </div>
                <div className="name">
                    <h2>Carter Endsley:</h2>
                    <img className="linkedin-logo" src="https://icons-for-free.com/iconfiles/png/512/linkedin+linkedin+logo+networking+social+media+icon-1320196081476022403.png" alt=""/>
                    <img className="github-logo" src="http://pngimg.com/uploads/github/github_PNG83.png" alt=""/>
                </div>
            </div>
        </div>
        );
    }
    }


