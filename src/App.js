import React, { Component } from 'react';
import logo from './tic-tac-toe.png';
import './App.css';
import TicTacToe from './TicTacToe';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Let's Play Tic-Tac-Toe</h1>
        </header>

        <TicTacToe />

      </div>
    );
  }
}

export default App;
