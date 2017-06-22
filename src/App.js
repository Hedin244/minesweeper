import React, { Component } from 'react'
import './App.css'
import {MineSweeper} from './minesweeper/MineSweeper.js'

const boardwidth = 10     // Zawsze wartość x
const boardheight = 10    // Zawsze wartość y
const bombCounter = 10

class App extends Component {

  render() {
    return (
      <MineSweeper width={10} height={10} bombs={10}/>
    )
  }
}

export default App;
