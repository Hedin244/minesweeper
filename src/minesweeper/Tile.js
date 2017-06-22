import React, {Component} from 'react'

export class Tile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value     : props.tile.isMine ? "#" : props.tile.counter,
    };
  }

  handleClickNormal () {
    if(this.props.tile.isFlaged){
      this.props.tile.handleFlag(this.props.tile);
    }
    else {
      this.props.tile.handleClick(this.props.tile);
    }
  }

  handleFlag (evt) {
    evt.preventDefault();
    if(!this.props.tile.isClicked){
      this.props.tile.handleFlag(this.props.tile);
    }
  }

  tileClassName () {
    if (this.props.tile.isFlaged === true) {
      return "Tile Tile__cover Tile__flag"
    }
    else if (this.props.tile.isClicked !== true) {
      return "Tile Tile__cover";
    }
    else if (this.props.tile.isMine === true) {
      return "Tile Tile__cover Tile__mine"
    }
    else {
      switch (this.props.tile.counter) {
        case 0:
          return "Tile Tile__cover--opened Tile__number0";
          break;
        case 1:
          return "Tile Tile__cover--opened Tile__number1";
          break;
        case 2:
          return "Tile Tile__cover--opened Tile__number2";
          break;
        case 3:
          return "Tile Tile__cover--opened Tile__number3";
          break;
        case 4:
          return "Tile Tile__cover--opened Tile__number4";
          break;
        case 5:
          return "Tile Tile__cover--opened Tile__number5";
          break;
        case 6:
          return "Tile Tile__cover--opened Tile__number6";
          break;
        case 7:
          return "Tile Tile__cover--opened Tile__number7";
          break;
        case 8:
          return "Tile Tile__cover--opened Tile__number8";
          break;
      }
    }
  }

  render () {
    var value = this.state.value;
    var name = this.tileClassName();
    return (
      <button className={name} onClick={this.handleClickNormal.bind(this)} onContextMenu={this.handleFlag.bind(this)}>
        {value}
      </button>
    )
  }
}
