import React, { Component } from 'react'

class Square extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isclicked: "false",
    }
  }
  handleClick = () => {
    let count = this.props.counter; // 5
    if (this.state.isclicked === "false") {
      count = this.props.counter - 1;
      this.setState({isclicked: "true"});
    }

    if (count < 0) {
      return
      count = 0
    }
    // if (count===0){
    //   return
    //   this.props.message = "You ran out of tries"
    this.props.indexLocation(this.props.index, count);
  }

  render(){
    return(
      <div>
        <div isclicked={this.state.isclicked} id="square" onClick={ this.handleClick }>
          { this.props.value }
        </div>
      </div>
    )
  }
}

export default Square
