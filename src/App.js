import React, { Component } from 'react'
import './App.css'
import {MineSweeper} from './minesweeper/MineSweeper.js'

const boardwidth = 2
const boardheight = 2
const bombCounter = 1

class App extends Component {

  render() {
    return (
      <MineSweeper width={boardwidth} height={boardheight} bombs={bombCounter}/>
    )
  }
}

export default App;
