import React, {Component} from 'react';
import './App.css';
import Dashboard from './Components/Dasbhoard/Dashboard';
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
