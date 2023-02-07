import { useState } from "react";
import './Board.css';
import GameState, { State } from "./Rules";
import ComputerGame from "./MiniMax";


const Square = ({ value, onClick }: { value: string, onClick: Function }) =>
    <button className="square" onClick={() => onClick()}>{value}</button>

const Board = () => {
    const game: string[][] = new Array(3);

    const defaultBoard = (game: string[][]) => {
        for (let i = 0; i < 3; i++) {
            game[i] = new Array(3);

            for (let j = 0; j < 3; j++) {
                game[i][j] = ' ';
            }
        }
    }

    defaultBoard(game);

    const [squares, setSquares] = useState(game.slice());
    const [message, setMessaje] = useState('Next player: X');
    const [turn, setTurn] = useState('X');
    const [state, setState] = useState(State.ContinueGame);
    const [typeGame, setTypeGame] = useState('player x');

    const actGame = (actTurn: string) => {
        let actMessage = message;
        let actState = GameState(squares);

        if (actState == State.ContinueGame) {
            actTurn = actTurn == 'X' ? 'O' : 'X';
            actMessage = message.substring(0, message.length - 1) + actTurn;
        } else {
            if (actState == State.Win) actMessage = 'Player ' + actTurn + ' has won!';
            else actMessage = 'End game: Draw!';
        }

        setSquares(squares.slice());
        setState(actState)
        setMessaje(actMessage);
        setState(GameState(squares));
        setTurn(actTurn);

        return actState;
    }

    const playComputer = (player: string) => {
        ComputerGame(squares, player);
        actGame(player);
    }

    const handleClick = (x: number, y: number) => () => {
        if (squares[x][y] != ' ' || state != State.ContinueGame) return;

        squares[x][y] = turn;

        let actState = actGame(turn);

        if (actState == State.ContinueGame && typeGame != '2 players')
            playComputer(turn == 'X' ? 'O' : 'X');
    }

    const handleTypeGame = (event: React.ChangeEvent<HTMLSelectElement>) => {
        newGame(event.target.value);
        setTypeGame(event.target.value);
    }

    const newGame = (type: string) => {
        defaultBoard(squares);

        if (type == 'player o') {
            playComputer('X');
        }
        else {
            setSquares(squares.slice());
            setMessaje('Next player: X');
            setTurn('X');
            setState(State.ContinueGame);
        }
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
            <div className="conf">
                <button className="reset" onClick={() => newGame(typeGame)}> New Game</button>
                <select className="type-game" onChange={handleTypeGame}>
                    <option value='player x'>Player X</option>
                    <option value='player o'>Player O</option>
                    <option value='2 players'>2 Players</option>
                </select>
            </div>
        </>
    )
}

export default Board;