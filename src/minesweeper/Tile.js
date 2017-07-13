import React, {Component} from 'react'

export class Tile extends Component {
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
        case 1:
          return "Tile Tile__cover--opened Tile__number1";
        case 2:
          return "Tile Tile__cover--opened Tile__number2";
        case 3:
          return "Tile Tile__cover--opened Tile__number3";
        case 4:
          return "Tile Tile__cover--opened Tile__number4";
        case 5:
          return "Tile Tile__cover--opened Tile__number5";
        case 6:
          return "Tile Tile__cover--opened Tile__number6";
        case 7:
          return "Tile Tile__cover--opened Tile__number7";
        case 8:
          return "Tile Tile__cover--opened Tile__number8";
      }
    }
  }

  render () {
    var value = this.props.tile.isClicked ? this.props.tile.counter : " " ;
    var name = this.tileClassName();
    return (
      <button className={name} onClick={this.handleClickNormal.bind(this)} onContextMenu={this.handleFlag.bind(this)}>
        {value}
      </button>
    )
  }
}
