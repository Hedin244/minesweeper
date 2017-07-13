import React, {Component} from 'react'
import {Row} from './Row.js'
import {createBoard} from './MSBoard.js'
import {OptionsMenu} from './OptionsMenu.js'

export class MineSweeper extends Component {
  constructor (props) {
    super(props);
    var tilesClicked = 0;
    this.state = {                                              // Properties:
      board : createBoard(  this.props.width,                   // width
                            this.props.height,                  // height
                            this.props.bombs,                   // bombs
                            this.handleClickNormal.bind(this),  // click
                            this.handleClickBomb.bind(this),    // clickBomb
                            this.handleFlag.bind(this)),        // clickFlag
      counterToWin : (this.props.width * this.props.height) - this.props.bombs,
    }
  }

  //      ------------------------- Handle interactions with menu -------------------------
  handleClickPlay (props) {
    this.setState({                                             // Properties:
      board : createBoard(  props.width,                        // width
                            props.height,                       // height
                            props.bombs,                        // bombs
                            this.handleClickNormal.bind(this),  // click
                            this.handleClickBomb.bind(this),    // clickBomb
                            this.handleFlag.bind(this)),         // clickFlag
      counterToWin : (props.width * props.height) - props.bombs,
    });
  }

  //      ------------------------- Handle interactions with board -------------------------
  handleClickNormal (tile) {
    var _board = this.state.board;
    if (_board[tile.y][tile.x].isClicked !== true){
      _board[tile.y][tile.x].isClicked = true;
      this.setState({ board : _board });
      this.state.counterToWin--;
      if (tile.counter === 0) {
        this.clickAround(tile);
      }
    }
  }

  addTileClicked () {
    this.tilesClicked++;
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
    this.setState({
      board : [],
      counterToWin : 1
    })
  }

  handleFlag (tile) {
    var _board = this.state.board;
    var _tile = _board[tile.y][tile.x];
    _tile.isFlaged = !_tile.isFlaged;
    this.setState({board : _board});
  }

  //      ------------------------- Handle interactions with board -------------------------
  componentDidUpdate () {
    if (this.state.counterToWin == 0) this.win();
  }

  win () {
    alert('Game Won!!!');
    this.setState({
      board : [],
      counterToWin : 1
    })
  }

  //      ------------------------- Render function -------------------------
  render () {
    var MineSweeperBoard = this.state.board.map((row, index) => (<Row tiles={row} key={index}/>));
    return (
      <center>
        <tbody>
            <OptionsMenu handleClickPlay={this.handleClickPlay.bind(this)}/>
        </tbody>

        <tbody>
            {MineSweeperBoard}
        </tbody>
      </center>
    );
  }
}
