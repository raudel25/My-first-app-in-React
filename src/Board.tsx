import { useState } from "react";
import './Board.css';
import GameState, { State } from "./Rules";


const Square = ({ value, onClick }: { value: string, onClick: Function }) =>
    <button className="square" onClick={() => onClick()}>{value}</button>

const Board = () => {
    const game: string[][] = new Array(3);

    for (let i = 0; i < 3; i++) {
        game[i] = new Array(3);

        for (let j = 0; j < 3; j++) {
            game[i][j] = ' ';
        }
    }

    const [squares, setSquares] = useState(game);
    const [message, setMessaje] = useState('Next player: X');
    const [turn, setTurn] = useState('X');
    const [state, setState] = useState(State.ContinueGame);

    const handleClick = (x: number, y: number) => () => {
        if (squares[x][y] != ' '||state!=State.ContinueGame) return;

        squares[x][y] = turn;
        setSquares(squares.slice());

        let actTurn = turn;
        let actMessage = message;
        let actState = GameState(squares);

        if (actState == State.ContinueGame) {
            actTurn = turn == 'X' ? 'O' : 'X';
            actMessage = message.substring(0, message.length - 1) + actTurn;
        } else {
            if (actState == State.Win) actMessage = 'Player ' + turn + ' has won!';
            else actMessage = 'End game: Draw!';
        }

        setState(actState)
        setMessaje(actMessage);
        setState(GameState(squares));
        setTurn(actTurn);
    }

    const newGame = () => {
        setSquares(game.slice());
        setMessaje('Next player: X');
        setTurn('X');
        setState(State.ContinueGame);
    }

    const renderSquare = (x: number, y: number) =>
        <Square value={squares[x][y]} onClick={handleClick(x, y)} />

    return (
        <>
            <h1>{message}</h1>
            <div className="board-row">
                {renderSquare(0, 0)}
                {renderSquare(0, 1)}
                {renderSquare(0, 2)}
            </div>
            <div className="board-row">
                {renderSquare(1, 0)}
                {renderSquare(1, 1)}
                {renderSquare(1, 2)}
            </div>
            <div className="board-row">
                {renderSquare(2, 0)}
                {renderSquare(2, 1)}
                {renderSquare(2, 2)}
            </div>
            <div className="resetCont">
                <button className="reset" onClick={() => newGame()}> New Game</button>
            </div>
        </>
    )
}

export default Board;