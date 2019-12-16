import React from 'react';
import './App.css';
import Dashboard from './Dasbhoard/Dashboard';
import Sidebar from './Components/Sidebar/Sidebar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Mountain Chess</h1> */}
      </header>
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
