import React, {Component} from 'react'
import {Row} from './Row.js';
import {createBoard} from './MSBoard.js'
import {OptionsMenu} from './OptionsMenu.js'

export class MineSweeper extends React.Component {
  constructor (props) {
    super(props);
    this.state = {                                                         //  Properties:
      board  : createBoard( this.props.width,                     //  width
                            this.props.height,                    //  height
                            this.props.bombs,                     //  bombs
                            this.handleClickNormal.bind(this),    //  click
                            this.handleClickBomb.bind(this),      //  clickBomb
                            this.handleFlag.bind(this)),          //  clickFlag
    }
  }
//      ------------------------- Handle interactions with menu -------------------------


//      ------------------------- Handle interactions with board -------------------------

  handleClickNormal (tile) {
    var _board = this.state.board;
    if (_board[tile.y][tile.x].isClicked !== true){
      _board[tile.y][tile.x].isClicked = true;
      this.setState({board : _board});
      if (tile.counter === 0) {
        this.clickAround(tile);
      }
    }
  }

  clickAround (tile) {
    var _board = this.state.board;
    for (var i = -1; i <= 1; i++){
      for (var j = -1; j <= 1; j++){
        try {this.handleClickNormal(_board[tile.y + i][tile.x + j])}
        catch(err) {};
      }
    }
  }

  handleClickBomb () {
    alert('Game Over');
  }

  handleFlag (tile) {
    var _board = this.state.board;
    var _tile = _board[tile.y][tile.x];
    _tile.isFlaged = !_tile.isFlaged;
    this.setState({board : _board});
  }

  render () {
    var MineSweeperBoard = this.state.board.map((row, index) => (<Row tiles={row} key={index}/>));
    return (
      <center>
          <tbody>
              <OptionsMenu />
          </tbody>

          <tbody>
              {MineSweeperBoard}
          </tbody>
      </center>
    );
  }
}
