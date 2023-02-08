import { useState } from "react";
import GameState, { ValueGame, State, valueGameToString } from "./Rules";
import Board from "./Board";
import './Game.css';
import ComputerGame from "./MiniMax";

const Game = () => {
    const game: ValueGame[][] = new Array(3);

    for (let i = 0; i < 3; i++) {
        game[i] = new Array(3);

        for (let j = 0; j < 3; j++) {
            game[i][j] = ValueGame._;
        }
    }

    const [squares, setSquares] = useState(game.slice());
    const [message, setMessaje] = useState('Next player: X');
    const [turn, setTurn] = useState(ValueGame.X);
    const [state, setState] = useState(State.ContinueGame);
    const [computerTurn, setComputerTurn] = useState(ValueGame.O);

    const actGame = () => {
        if (state != State.ContinueGame) return;

        let actMessage = message;
        let actState = GameState(squares);
        let actTurn = turn;

        if (actState == State.ContinueGame) {
            actTurn = actTurn == ValueGame.X ? ValueGame.O : ValueGame.X;
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
        if (state == State.ContinueGame && computerTurn == turn) {
            ComputerGame(squares, computerTurn);
            actGame();
        }
    }

    const newGame = () => {
        setSquares(game.slice());
        setMessaje('Next player: X');
        setTurn(ValueGame.X);
        setState(State.ContinueGame);
    }

    const handleTypeGame = (event: React.ChangeEvent<HTMLSelectElement>) => {
        newGame();

        if (event.target.value == '2')
            setComputerTurn(ValueGame._);
        else {
            if (event.target.value == 'x') setComputerTurn(ValueGame.O);
            else setComputerTurn(ValueGame.X);
        }
    }

    playComputer();

    return (
        <>
            <h1>{message}</h1>
            <Board squares={squares} turn={turn} actGame={actGame} />
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