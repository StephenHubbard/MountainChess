import React, {Component} from 'react';
import './App.css';
import Dashboard from './Components/Dasbhoard/Dashboard';
// import Sidebar from './Components/Sidebar/Sidebar'
// import Chessboard from 'chessboardjsx';
// import Chess from 'chess.js';
// import Chessboard from 'chessboardjsx';
// import Chess from 'chess.js';
// import GameView from "../src/Components/GameView/GameView";
// import Login from './Components/Auth/Login';
// import Register from './Components/Auth/Register';
// import Demo from "../src/Components/GameView/Chessboard/Demo";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import Routes from './Routes';

class App extends Component { 
  
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <Dashboard />
        </header> 
          {Routes}
      </div>
    )
  }
}

function mapStateToProps(reduxState) {
  return reduxState
}

export default withRouter(connect(mapStateToProps, {})(App))
