import React, {Component} from 'react'
import {Board} from './MSBoard.js'
import {OptionsMenu} from './OptionsMenu.js'

export class MineSweeper extends Component {
  constructor (props) {
    super(props);
    this.state = {
      width   : 10,
      height  : 10,
      bombs   : 10
    }
  }

  handleClick_Play (props) {
    this.setState({ width   : props.width,
                    height  : props.height,
                    bombs   : props.bombs
                  });
  }

  render () {
    return (
      <center>
        <tbody>
            <OptionsMenu handleClick_Play={this.handleClick_Play.bind(this)}/>
        </tbody>
            <Board width={this.state.width} height={this.state.height} bombs={this.state.bombs}/>
      </center>
    );
  }
}
