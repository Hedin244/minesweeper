import React, {Component} from 'react'
import {Row} from './Row.js';

export class Board extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cos         : 0,
      board       : this.createBoard(this.props),
      gameStatus  : "playing",
      tilesOpened : 0
    }
  }

  componentWillReceiveProps (newProps) {
    this.clear();
    console.log(this.state.cos);
    this.forceUpdate();
    console.log('force');
    console.log(this.state.cos);
    this.update(newProps);
    console.log(this.state.cos);
  }

  clear () {
    console.log('clear')
    var clear = 0;
    this.setState({ board : [1, 2],
                    cos   : 1});
  }
  update (newProps) {
    console.log('update')
    var _board = this.createBoard(newProps);
    this.setState({ board : _board,
                    cos   : 0});
  }

//      ------------------------- Creating a gameing board -------------------------
  rand (max) {
    return (Math.floor(Math.random()*max));
  };
  checkMine (mine, newMine) {
    if (mine[0] == newMine[0] && mine[1] == newMine[1]){
      return true;
    }
    else {
      return false;
    }
  };
  checkMineList (mineList, newMine) {
      var isNew = true;
      mineList.some((mine) => this.checkMine(mine, newMine) ? isNew=false : isNew=true);
      return isNew;
  }
  createMineList () {
    var mineList = [];
      for(var i = 0; i < this.props.bombs; i++){
        var newMine = [this.rand(this.props.width), this.rand(this.props.height)];
        this.checkMineList(mineList, newMine) ? mineList.push(newMine) : i--;
      }
    return mineList;
  }
  increaseCounter (tile) {
    tile.counter += 1;
  }
  plantMines (board) {
      var mineList = this.createMineList();
      var _board = board;
      for (var i = 0; i < this.props.bombs; i++){
        var x = mineList[i][0];
        var y = mineList[i][1];
        _board[y][x].isMine = true;
        _board[y][x].handleClick = this.handleClick_Bomb.bind(this);

        try {this.increaseCounter(_board[y-1][x-1])}
        catch(err) {}
        try {this.increaseCounter(_board[y-1][x])}
        catch(err) {}
        try {this.increaseCounter(_board[y-1][x+1])}
        catch(err) {}
        try {this.increaseCounter(_board[y][x-1])}
        catch(err) {}
        try {this.increaseCounter(_board[y][x+1])}
        catch(err) {}
        try {this.increaseCounter(_board[y+1][x-1])}
        catch(err) {}
        try {this.increaseCounter(_board[y+1][x])}
        catch(err) {}
        try {this.increaseCounter(_board[y+1][x+1])}
        catch(err) {}

      }
      return _board;

  }
  createBoard (props) {
    var board = [];
    console.log(props)
    for(var row = 0; row < props.height; row++){
      board.push([]);
      for(var col = 0; col < props.width; col++){
        board[row].push({
          x           : col,
          y           : row,
          isMine      : false,
          counter     : 0,
          isClicked   : false,
          handleClick : this.handleClick_Normal.bind(this),
          isFlaged    : false,
          handleFlag  : this.handleClick_Flag.bind(this)
        });
      }
    }
    var _board = this.plantMines(board);

    return _board;
  }

//      ------------------------- Handle interactions with board -------------------------
  handleClick_Normal (tile) {
    var _board = this.state.board;
    var _tilesOpened = this.state.tilesOpened++;
    if (_board[tile.y][tile.x].isClicked !== true){
      _board[tile.y][tile.x].isClicked = true;

      this.setState({ board : _board });

      if (tile.counter === 0) {
        this.clickAround(tile);
      }
    }
  }
  clickAround (tile) {
    var _board = this.state.board;
    for (var i = -1; i <= 1; i++){
      for (var j = -1; j <= 1; j++){
        try {this.handleClick_Normal(_board[tile.y + i][tile.x + j])}
        catch(err) {};
      }
    }
  }
  handleClick_Bomb () {
    alert('Game Over');
  }
  handleClick_Flag (tile) {
    var _board = this.state.board;
    var _tile = _board[tile.y][tile.x];
    _tile.isFlaged = !_tile.isFlaged;
    this.setState({board : _board});
  }

//      ------------------------- Render method -------------------------
  render () {
    var MineSweeperBoard = this.state.board.map((row, index) => (<Row tiles={row} key={index}/>));
    return (
      <tbody>
        {MineSweeperBoard}
      </tbody>
    )
  }
}
