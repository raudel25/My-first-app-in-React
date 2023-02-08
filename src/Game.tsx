import { useState } from "react";
import GameState, { Turn, State } from "./Rules";
import Board from "./Board";
import './Game.css';
import ComputerGame from "./MiniMax";

const Game = () => {
    const game: string[][] = new Array(3);

    for (let i = 0; i < 3; i++) {
        game[i] = new Array(3);

        for (let j = 0; j < 3; j++) {
            game[i][j] = ' ';
        }
    }

    const [squares, setSquares] = useState(game.slice());
    const [message, setMessaje] = useState('Next player: X');
    const [turn, setTurn] = useState(Turn.X);
    const [state, setState] = useState(State.ContinueGame);
    const [computerPlay, setComputerPlay] = useState(true);
    const [computerTurn, setComputerTurn] = useState(Turn.O);

    const valueGameToString = (value: Turn) => value == Turn.X ? 'X' : 'O';

    const actGame = () => {
        let actMessage = message;
        let actState = GameState(squares);
        let actTurn = turn;

        if (actState == State.ContinueGame) {
            actTurn = actTurn == Turn.X ? Turn.O : Turn.X;
            actMessage = message.substring(0, message.length - 1) + valueGameToString(actTurn);
        } else {
            if (actState == State.Win) actMessage = 'Player ' + valueGameToString(actTurn) + ' has won!';
            else actMessage = 'End game: Draw!';
        }

        setSquares(squares.slice());
        setState(actState)
        setMessaje(actMessage);
        setState(GameState(squares));
        setTurn(actTurn);
    }

    const playComputer = () => {
        if (state == State.ContinueGame && computerTurn == turn && computerPlay) {
            ComputerGame(squares, computerTurn);
            actGame();
        }
    }

    const newGame = () => {
        setSquares(game.slice());
        setMessaje('Next player: X');
        setTurn(Turn.X);
        setState(State.ContinueGame);
    }

    const handleTypeGame = (event: React.ChangeEvent<HTMLSelectElement>) => {
        newGame();

        if (event.target.value == '2')
            setComputerPlay(false);
        else {
            setComputerPlay(true);

            if (event.target.value == 'x') setComputerTurn(Turn.O);
            else setComputerTurn(Turn.X);
        }
    }

    playComputer();

    return (
        <>
            <h1>{message}</h1>
            <Board squares={squares} turn={turn} state={state} actGame={actGame} />
            <div className="conf">
                <button className="reset" onClick={() => newGame()}> New Game</button>
                <select className="type-game" onChange={handleTypeGame}>
                    <option value='x'>Player X</option>
                    <option value='o'>Player O</option>
                    <option value='2'>2 Players</option>
                </select>
            </div>
        </>
    );
}

export default Game;