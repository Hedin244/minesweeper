import React, {Component} from 'react'

export class OptionsMenu extends Component {
  constructor (props) {
    super(props);
    this.state = {
      width    : 4,
      height   : 4,
      bombs    : 2,
      currentLevel    : "easy"
    }
    this.handleInputChange_width = this.handleInputChange_width.bind(this);
    this.handleInputChange_height = this.handleInputChange_height.bind(this);
    this.handleInputChange_bombs = this.handleInputChange_bombs.bind(this);
  }

  handleInputChange_width (evt) {
    this.setState({
      width: evt.target.value
    });
    this.handleInputChange_level(this.state.width*this.state.height, this.state.bombs);
  }
  handleInputChange_height (evt) {
    this.setState({
      height: evt.target.value
    });
    this.handleInputChange_level(this.state.width*this.state.height, this.state.bombs);
  }
  handleInputChange_bombs (evt) {
    this.setState({
      bombs: evt.target.value
    });
    this.handleInputChange_level(this.state.width*this.state.height, this.state.bombs);
  }

  handleInputChange_level (field, bombs) {
    var difficulty = bombs/(field*3) * field;
    if (difficulty < 500){
      this.setState({
        currentLevel: "easy"
      });
    }
    else if (difficulty < 2500){
      this.setState({
        currentLevel: "medium"
      });
    }
    else if (difficulty < 4000){
      this.setState({
        currentLevel: "hard"
      });
    }

  }

  handleClickPlay () {
    this.props.handleClickPlay(this.state);
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
                          value={this.state.width}/>
            </div>
            <div> <input  type="text"
                          onChange={this.handleInputChange_height}
                          value={this.state.height}/>
            </div>
            <div> <input  type="text"
                          onChange={this.handleInputChange_bombs}
                          value={this.state.bombs}/>
            </div>
          </th>
          <th>
            <div className="Menu__Difficulty"> Dificulty:
              <div className="Menu__Level__Easy">{this.state.currentLevel}</div>
            </div>
            <button className="Button__Play" onClick={this.handleClickPlay.bind(this)}> Play! </button>
          </th>
        </table>
      </div>
    )
  }
}
