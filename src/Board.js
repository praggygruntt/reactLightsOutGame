import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.25
  }
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    this.createBoard = this.createBoard.bind(this);
  }


  createBoard() {
    let board = [];
    for(let x=0; x<this.props.nRows; x++) {
      let row = [];
      for(let y=0; y<this.props.nCols; y++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row)
    }
    return board;

  };

 

  flipCellsAround(coord) {
    let {nCols, nRows} = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);

    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nRows && y >= 0 && y < nCols) {
        board[x][y] = !board[x][y];
      };
    }

    // TODO: flip this cell and the cells around it
    flipCell(x, y);
    flipCell(x+1, y);
    flipCell(x-1, y);
    flipCell(x, y+1);
    flipCell(x, y-1);
    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({board, hasWon});
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({ board, hasWon})
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else
    if(this.state.hasWon) {
      return <h1 id="winningText"><span className="flux">YOU</span> <span className="neon">WON!</span></h1>
    }
    // TODO

    // make table board
    let tableBoard = [];
    for(let x=0; x<this.props.nRows; x++) {
      let row = [];
      for(let y=0; y<this.props.nCols; y++) {
        let coord = `${x}-${y}`
        row.push(
          <Cell 
            isLit={this.state.board[x][y]} 
            key={coord} 
            flipCellsAroundMe={ () => this.flipCellsAround(coord) }/>);
      }
      tableBoard.push(<tr key={x}>{row}</tr>);
    }
    return(
      <table className="Board">
        <tbody className="Table"> 
          {tableBoard}
        </tbody>
      </table>
    )
  }
}


export default Board;
