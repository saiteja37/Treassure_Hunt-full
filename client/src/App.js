import React, { Component } from 'react';
import Board from './Component/Board'
import './App.css';
import { Navigate, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

class App extends Component {
  submit=()=>{
    localStorage.removeItem("pos-user")
  }
  render() {
    return (
      <div id="container">
        <h1 className="shadow" style={{paddingTop:"5%",color:"blue"}} > Treasure Hunt Game </h1>
        <a href='http://localhost:3000/lead'><h2>Leaderboard</h2></a>
          <Board />
        <button onClick={this.submit}>Logout</button>
      </div>
    );
  }
}

export default App;