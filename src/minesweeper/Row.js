import React, {Component} from 'react'
import {Tile} from './Tile.js'

export class Row extends Component {
  render () {
    var { tiles } = this.props;
    var Tiles = tiles.map((tile, index) => {
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
