import React, { useState } from 'react'
import axios from 'axios';


export default function AppFunctional(props) {

const [coordinate, setCoordinate] = useState({'x':2, 'y':2})
const [steps, setSteps] = useState(0);
const [message, setMessage] = useState('');
const [email, setEmail] = useState('');

const inputChange = event => {
  const { value } = event.target;
  setEmail(value);
}

const onSubmit = evt => {
  evt.preventDefault()

  axios.post('http://localhost:9000/api/result', { "x": coordinate.x, "y":coordinate.y, "steps": steps, "email": email})
  .then(response => {
    setMessage(response.data.message)
    setEmail('')})
  .catch( error => 
    setMessage(error.response.data.message))
}

  const right = () => {
    if (coordinate.x >= 3) {
      setMessage ("You can't go right")
    }
    else {
      setSteps(steps + 1)
      setCoordinate({...coordinate, "x": coordinate.x + 1})
      setMessage('');
    }
  }

  const left= () => {
    if (coordinate.x <= 1) {
      setMessage ("You can't go left")
    }
    else {
      setSteps(steps + 1)
      setCoordinate({...coordinate, "x": coordinate.x - 1})
      setMessage('');
    }
  }

  const up = () => {
    if (coordinate.y <= 1) {
      setMessage ("You can't go up")
    }
    else {
      setSteps(steps + 1)
      setCoordinate({...coordinate, "y": coordinate.y - 1})
      setMessage('');
    }
  }

  const down = () => {
    if (coordinate.y >= 3) {
      setMessage ("You can't go down")
    }
    else {
      setSteps(steps + 1)
      setCoordinate({...coordinate, "y": coordinate.y + 1})
      setMessage('');
    }
  }

  const reset = () => {
    setCoordinate({'x':2, 'y':2})
    setSteps(0);
    setMessage('')
    setEmail('')
  }



  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${coordinate.x}, ${coordinate.y})`}</h3>
        <h3 id="steps">You moved {steps} {steps !== 1 ? "times" : "time"}</h3>
      </div>
      <div id="grid">
        <div className={coordinate.x === 1 && coordinate.y === 1 ? 'square active' : 'square'}>{coordinate.x === 1 && coordinate.y === 1 ? 'B' : ''}</div>
        <div className={coordinate.x === 2 && coordinate.y === 1 ? 'square active' : 'square'}>{coordinate.x === 2 && coordinate.y === 1 ? 'B' : ''}</div>
        <div className={coordinate.x === 3 && coordinate.y === 1 ? 'square active' : 'square'}>{coordinate.x === 3 && coordinate.y === 1 ? 'B' : ''}</div>
        <div className={coordinate.x === 1 && coordinate.y === 2 ? 'square active' : 'square'}>{coordinate.x === 1 && coordinate.y === 2 ? 'B' : ''}</div>
        <div className={coordinate.x === 2 && coordinate.y === 2 ? 'square active' : 'square'}>{coordinate.x === 2 && coordinate.y === 2 ? 'B' : ''}</div>
        <div className={coordinate.x === 3 && coordinate.y === 2 ? 'square active' : 'square'}>{coordinate.x === 3 && coordinate.y === 2 ? 'B' : ''}</div>
        <div className={coordinate.x === 1 && coordinate.y === 3 ? 'square active' : 'square'}>{coordinate.x === 1 && coordinate.y === 3 ? 'B' : ''}</div>
        <div className={coordinate.x === 2 && coordinate.y === 3 ? 'square active' : 'square'}>{coordinate.x === 2 && coordinate.y === 3 ? 'B' : ''}</div>
        <div className={coordinate.x === 3 && coordinate.y === 3 ? 'square active' : 'square'}>{coordinate.x === 3 && coordinate.y === 3 ? 'B' : ''}</div>
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick = {left}>LEFT</button>
        <button id="up" onClick = {up}>UP</button>
        <button id="right" onClick = {right}>RIGHT</button>
        <button id="down" onClick = {down}>DOWN</button>
        <button id="reset" onClick = {reset}>reset</button>
      </div>
      <form onSubmit = {onSubmit} >
        <input id="email" onChange = {inputChange} value = {email} type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
