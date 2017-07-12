import React, {Component} from 'react'
import {Tile} from './Tile.js'

export class Row extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tiles : props.tiles
    };
  }

  render () {
    var Tiles = this.state.tiles.map((tile, index) => {
      return (
        <Tile tile={tile} key={index}/>
      );
    });
    return (
      <tr>
          {Tiles}
      </tr>
    );
  }
}
