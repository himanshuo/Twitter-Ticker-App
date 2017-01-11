import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ticker from './Ticker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Twitter Ticker</h2>
        </div>
        <p className="App-intro">
          Twitter Ticker shows you how the change in the number of tweets using 'Capital One' each second.
        </p>
        <p className="App-intro">This application uses an expressJS server, the live Twitter Streaming Filter API, websockets via socket.io to stream the cleaned and processed data from the server to the client, react to handle the UX, Highcharts to build the charts, and is deployed on AWS.</p>
        <Ticker ticker="Capital One"></Ticker>
      </div>
    );
  }
}

export default App;
