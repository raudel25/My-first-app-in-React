import { useState } from "react";
import './Board.css';


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
    const [state, setState] = useState('X');

    const handleClick = (x: number, y: number) => () => {
        if (squares[x][y] != ' ') return;

        squares[x][y] = state;
        setSquares(squares.slice());

        if (state == 'X') { setState('O'); }
        else { setState('X'); }
    }

    const newGame = () => {
        setSquares(game.slice());
        setState('X');
    }

    const renderSquare = (x: number, y: number) =>
        <Square value={squares[x][y]} onClick={handleClick(x, y)} />

    return (
        <>
            <h1>Next player: {state}</h1>
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