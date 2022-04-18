import React from 'react'
import axios from 'axios';

const initialState = {
  coordinate: {"x": 2, "y":2},
  steps:0,
  email:'',
  message:''
}

export default class AppClass extends React.Component {

  state = initialState

  onChange = event => {
    this.setState({...this.state, email: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
  axios.post('http://localhost:9000/api/result', { "x": this.state.coordinate.x, "y": this.state.coordinate.y, "steps": this.state.steps, "email":this.state.email})
  .then(response => {
    this.setState({...this.state, message: response.data.message})
  })
  .catch(error => {
    this.setState({...this.state, message: error.response.data.message})
  })
  this.setState({...this.state, email:''
  })
  }

  right = () => {
    if (this.state.coordinate.x >= 3) {
      this.setState({...this.state,
      message: "You can't go right"})
    }
    else {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        coordinate: {...this.state.coordinate, "x": this.state.coordinate.x + 1},
        message: ''
      })
    }
  }

  left= () => {
    if (this.state.coordinate.x <= 1) {
      this.setState({...this.state,
      message: "You can't go left"})
    }
    else {
      this.setState({
        ...this.state,
        steps: this.state.steps + 1,
        coordinate: {...this.state.coordinate, "x": this.state.coordinate.x - 1},
        message: ''
      })
    }
  }

  up = () => {
    if (this.state.coordinate.y <= 1) {
      this.setState({...this.state,
      message: "You can't go up"})
      }
    else {
      this.setState({...this.state,
      steps: this.state.steps + 1,
    coordinate: {...this.state.coordinate,
    "y": this.state.coordinate.y - 1},
    message: ''})
    }
  }

  down = () => {
    if (this.state.coordinate.y>= 3) {
      this.setState({...this.state,
      message: "You can't go down"})
    }
    else {
      this.setState({...this.state,
      steps: this.state.steps + 1,
      coordinate: {...this.state.coordinate,
      "y": this.state.coordinate.y + 1},
      message: ''})
      }
    }

  reset = () => {
    this.setState({...this.state,
      steps: 0,
      coordinate: {'x': 2, 'y': 2},
      message: '',
    email : ''})
  }






  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.coordinate.x}, ${this.state.coordinate.y})`}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps !== 1 ? 'times' : 'time'}</h3>
        </div>
        <div id="grid">
          <div className={`${this.state.coordinate.x === 1 && this.state.coordinate.y === 1 ? 'square active' : 'square'}`}>{this.state.coordinate.x === 1 && this.state.coordinate.y === 1 ? "B" : ""}</div>
          <div className={`${this.state.coordinate.x === 2 && this.state.coordinate.y === 1 ? 'square active' : 'square'}`}>{this.state.coordinate.x === 2 && this.state.coordinate.y === 1 ? "B" : ""}</div>
          <div className={`${this.state.coordinate.x === 3 && this.state.coordinate.y === 1 ? 'square active' : 'square'}`}>{this.state.coordinate.x === 3 && this.state.coordinate.y === 1 ? "B" : ""}</div>
          <div className={`${this.state.coordinate.x === 1 && this.state.coordinate.y === 2 ? 'square active' : 'square'}`}>{this.state.coordinate.x === 1 && this.state.coordinate.y === 2 ? "B" : ""}</div>
          <div className={`${this.state.coordinate.x === 2 && this.state.coordinate.y === 2 ? 'square active' : 'square'}`}>{this.state.coordinate.x === 2 && this.state.coordinate.y === 2 ? "B" : ""}</div>
          <div className={`${this.state.coordinate.x === 3 && this.state.coordinate.y === 2 ? 'square active' : 'square'}`}>{this.state.coordinate.x === 3 && this.state.coordinate.y === 2 ? "B" : ""}</div>
          <div className={`${this.state.coordinate.x === 1 && this.state.coordinate.y === 3 ? 'square active' : 'square'}`}>{this.state.coordinate.x === 1 && this.state.coordinate.y === 3 ? "B" : ""}</div>
          <div className={`${this.state.coordinate.x === 2 && this.state.coordinate.y === 3 ? 'square active' : 'square'}`}>{this.state.coordinate.x === 2 && this.state.coordinate.y === 3 ? "B" : ""}</div>
          <div className={`${this.state.coordinate.x === 3 && this.state.coordinate.y === 3 ? 'square active' : 'square'}`}>{this.state.coordinate.x === 3 && this.state.coordinate.y === 3 ? "B" : ""}</div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick = {this.left}>LEFT</button>
          <button id="up" onClick = {this.up}>UP</button>
          <button id="right" onClick = {this.right}>RIGHT</button>
          <button id="down" onClick = {this.down}>DOWN</button>
          <button id="reset" onClick = {this.reset}>reset</button>
        </div>
        <form onSubmit = {this.onSubmit}>
          <input id="email" onChange = {this.onChange} value = {this.state.email} type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
