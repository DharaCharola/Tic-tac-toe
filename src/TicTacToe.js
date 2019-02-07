import React, { Component, Fragment } from 'react';
import Cross from './cross.png';
import Zero from './zero.png';
import {Shower} from './Shower';

class TicTacToe extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
        this.renderBox = this.renderBox.bind(this);
        this.handleTick = this.handleTick.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
        this.reset = this.reset.bind(this);
        this.declareWinner = this.declareWinner.bind(this);
    }

    getInitialState() {
        let initialState = {
            boxes: {},
            row: [1, 2, 3],
            col: [1, 2, 3],
            nextPlayer: 'x',
            isWinner: false,
        }

        return initialState;
    }

    reset() {
        this.setState(this.getInitialState());
    }

    renderBox (rowIndex, colIndex) {

        let sign = '';

        if (this.state.boxes[`${rowIndex}${colIndex}`] === 'x') {
           sign = < img src={`${Cross}`} style={{height: "50%", Width: "50%"}} alt="x"/>;
        } else if (this.state.boxes[`${rowIndex}${colIndex}`] === '0') {
            sign = < img src={`${Zero}`} style={{height: "50%", Width: "50%"}} alt="0"/>;
        }

        return <div className="square" key={`${rowIndex}${colIndex}`} onClick={()=>this.handleTick(rowIndex, colIndex)}>{sign}</div>

    }

    handleTick(rowIndex, colIndex){

        let currentPlayer = this.state.nextPlayer;
        if (!this.state.isWinner && !this.state.boxes[`${rowIndex}${colIndex}`]) {
            let boxData = this.state.boxes;
            boxData[`${rowIndex}${colIndex}`] = this.state.nextPlayer;
            let isWinner = this.checkWinner();
            this.setState({
                boxes: boxData,
                isWinner: isWinner,
                nextPlayer: (currentPlayer === 'x') ? '0' : 'x',
            });
        }
    }

    checkWinner() {
        let currentPlayer = this.state.nextPlayer;

        for(let row=1; row<=3; row++) {
            for(let col=1; col<=3; col++) {

                // check for row entry
                if ((this.state.boxes[`${row}1`] && this.state.boxes[`${row}1`] === currentPlayer) && (this.state.boxes[`${row}2`] && this.state.boxes[`${row}2`] === currentPlayer) && (this.state.boxes[`${row}3`] && this.state.boxes[`${row}3`] === currentPlayer)) {

                    return true;

                }

                // check for column entry
                else if ((this.state.boxes[`1${col}`] && this.state.boxes[`1${col}`] === currentPlayer) && (this.state.boxes[`2${col}`] && this.state.boxes[`2${col}`] === currentPlayer) && (this.state.boxes[`3${col}`] && this.state.boxes[`3${col}`] === currentPlayer)) {

                    return true;

                }

                // check for diagonal entry
                else if (row === col) {
                    if ((this.state.boxes[`${row+1}${col-1}`] && this.state.boxes[`${row+1}${col-1}`] === currentPlayer) && (this.state.boxes[`${row-1}${col+1}`] && this.state.boxes[`${row-1}${col+1}`] === currentPlayer) && (this.state.boxes[`${row}${col}`] && this.state.boxes[`${row}${col}`] === currentPlayer)) {

                        return true;

                    } else if ((this.state.boxes[`${row-1}${col-1}`] && this.state.boxes[`${row-1}${col-1}`] === currentPlayer) && (this.state.boxes[`${row+1}${col+1}`] && this.state.boxes[`${row+1}${col+1}`] === currentPlayer) && (this.state.boxes[`${row}${col}`] && this.state.boxes[`${row}${col}`] === currentPlayer)) {

                        return true;
                    }
                }

            }
        }
        return false;
    }

    declareWinner() {
        if(this.state.isWinner && this.state.nextPlayer === 'x') {
            return <div className="winner-popup"><h1>Congratulations !</h1> <h3>Winner is 0.</h3></div>
        }
        else if ( this.state.isWinner && this.state.nextPlayer === '0') {
            return <div className="winner-popup"><h1>Congratulations !</h1> <h3>Winner is x.</h3></div>
        }
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.isWinner &&
                    <Shower />
                }

                <div className="box">

                    {this.declareWinner()}

                    <div className="row">

                        {
                            this.state.row.map(rowIndex =>
                                this.state.col.map(colIndex =>
                                    this.renderBox(rowIndex, colIndex)
                                )
                            )
                        }

                    </div>

                    <div><a className="btn reset-btn" onClick={this.reset}>Reset</a></div>
                </div>



            </Fragment>
        )
    }
}

export default TicTacToe;