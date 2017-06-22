import React, {Component} from 'react'

export class OptionsMenu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentWidth    : 15,
      currentHeigth   : 15,
      currentBombs    : 5,
      currentLevel    : "easy"
    }
    this.handleInputChange_width = this.handleInputChange_width.bind(this);
    this.handleInputChange_heigth = this.handleInputChange_heigth.bind(this);
    this.handleInputChange_bombs = this.handleInputChange_bombs.bind(this);
  }

  handleInputChange_width (evt) {
    this.setState({
      currentWidth: evt.target.value
    });
  }
  handleInputChange_heigth (evt) {
    this.setState({
      currentHeigth: evt.target.value
    });
  }
  handleInputChange_bombs (evt) {
    this.setState({
      currentBombs: evt.target.value
    });
  }

  handleClick_Play () {
    this.props.handleClick_Play(this.state);
  }

  render () {
    return (
      <div>
        <h1>MineSweeper</h1>
        <table className="Menu">
          <th>
            <div className="Menu__Text"> Width: </div>
            <div className="Menu__Text"> Height: </div>
            <div className="Menu__Text"> Bombs: </div>
          </th>
          <th>
            <div> <input  type="text"
                          onChange={this.handleInputChange_width}
                          value={this.state.currentWidth}/>
            </div>
            <div> <input  type="text"
                          onChange={this.handleInputChange_heigth}
                          value={this.state.currentHeigth}/>
            </div>
            <div> <input  type="text"
                          onChange={this.handleInputChange_bombs}
                          value={this.state.currentBombs}/>
            </div>
          </th>
          <th>
            <div className="Menu__Difficulty"> Dificulty:
              <div className="Menu__Level__Easy">{this.state.currentLevel}</div>
            </div>
            <button className="Button__Play" onClick={this.handleClick_Play.bind(this)}> Play! </button>
          </th>
        </table>
      </div>
    )
  }
}
