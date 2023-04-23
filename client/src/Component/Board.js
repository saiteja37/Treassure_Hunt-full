import React, { Component } from 'react'
import Square from './Square'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

class Board extends Component{
  constructor(props){
    super(props)
    this.state = {
      board: ["🤔", "🤔", "🤔", "🤔", "🤔", "🤔", "🤔", "🤔", "🤔"],
      treasureLoc: Math.floor(Math.random() * 9),
      treasureLoc: Math.floor(Math.random() * 9),
      bombLoc: Math.floor(Math.random() * 9),
      treasure: "💰",
      tree: "🌴",
      bomb: "💣",
      counter: 5,
      message:""
    }
  }

  indexLocation = (index, count) => {
    let { board, treasureLoc, treasure, bombLoc, bomb, tree, message  } =  this.state;
    let newBoard = board;
    const dat = this.state.modal;
    const setDat = (params) => this.setState({dat: params});
    const tok=localStorage.getItem("pos-user");
    const  ans=tok.slice(1)
    const token=ans.slice(0,ans.length-1)
    console.log(treasureLoc, bombLoc);
    if (treasureLoc === index) {
      newBoard[treasureLoc] = treasure
      this.setState({board: newBoard});
      this.setState({message: "You         won!! $$$$"});
      
   axios.get("http://localhost:2000/profile",{
    headers:{
        "x-token":token
    }
  }).then((res)=>{
    setDat(res.data._id)
    const data={
      count:5-count,
      person:res.data.name
    }
    axios.post("http://localhost:2000/score",data).then((res)=>{
            console.log(res)
    })
  })
  setTimeout(() => window.location.reload(), 1500);
    }
    else if (bombLoc === index) {
      newBoard[bombLoc] = bomb
      this.setState({board:newBoard});
      this.setState({message: "Bombed! x__x"});
      setTimeout(() => window.location.reload(), 1500);
    }
    else if (count === 0) {
      this.setState({message: "You ran out of tries!"});
      setTimeout(() => window.location.reload(), 1500);
    }
    else {
      newBoard[index] = tree
      this.setState ({board: newBoard});
    }
      this.setState({counter:count});
  }

  resetGame = () => {
    window.location.reload();
  }


  render(){
    const modal = this.state.modal;
    const setModal = (params) => this.setState({modal: params});
    const modal1 = this.state.modal1;
    const setModal1 = (params) => this.setState({modal1: params});
    const modal2 = this.state.modal2;
    const setModal2 = (params) => this.setState({modal2: params});
    const modal3 = this.state.modal3;
    const setModal3 = (params) => this.setState({modal3: params});
    
    let square = this.state.board.map((value, index) => {
      return(
        <div>
          <Square
          indexLocation={ this.indexLocation }
          key={ index }
          index={ index }
          value={ value }
          counter={this.state.counter}
          message = {this.state.message}
        />
        </div>
      )
    });
    return(
      <div>
        <h2 id="counter" className="shadow"> Counter : {this.state.counter} </h2>
        <div id="board" className='mt-5'>
          { square }
        </div>
        <div>
          <center className='mt-4'>
        <button value={true} onClick={(e)=>setModal(e.target.value)}>clue-1</button>
        {
        modal?<div>
        {(this.state.treasureLoc+1)%2===0?<h2>Treassure is in even box</h2>:<h2>Treassure is in odd box</h2>}
        </div>:<h1></h1>
        }
        <button value={true} onClick={(e)=>setModal1(e.target.value)}>clue-2</button>
        {
        modal1?<div>
        {(this.state.bombLoc+1)%2===0?<h2>Bomb is in even box</h2>:<h2>Bomb is in odd box</h2>}
        </div>:<h1></h1>
        }
        <button><a  href='https://www.elitmus.com/' target='_blank' rel="noopener noreferrer">clue-3</a></button>
        <button value={true} onClick={(e)=>setModal2(e.target.value)}>clue-4</button>
        {
        modal2?<div>
        {(this.state.treasureLoc+1)%3===0?<h2>Treassure box is divisble by 3</h2>:<h2>Treassure box is not divisble by 3</h2>}
        </div>:<h1></h1>
        }
        <button value={true} onClick={(e)=>setModal3(e.target.value)}>clue-5</button>
        {
        modal3?<div>
        {(this.state.bombLoc+1)%3===0?<h2>Bomb box is divisble by 3</h2>:<h2>Bomb box is not divisble by 3</h2>}
        </div>:<h1></h1>
        }
        
        <button onClick={this.resetGame}>Reset Game</button>
        </center>
        <h2 id="message"> {this.state.message}</h2>
        </div>
      </div>
    )
  }
}

export default Board
