import { useState } from "react";
import { ValueGame, State } from "../logic/Rules";
import Board from "./Board";
import './Game.css';
import ComputerGame from "../logic/MiniMax";
import { useGameState } from "../hooks/useGameState";

const Game = () => {
    const { squares, turn, state, message, actGame, newGame } = useGameState();
    const [computerTurn, setComputerTurn] = useState(ValueGame.O);

    const playComputer = () => {
        if (state === State.ContinueGame && computerTurn === turn) {
            ComputerGame(squares, computerTurn);
            actGame();
        }
    }

    const handleTypeGame = (event: React.ChangeEvent<HTMLSelectElement>) => {
        newGame();

        if (event.target.value === '2')
            setComputerTurn(ValueGame._);
        else {
            if (event.target.value === 'x') setComputerTurn(ValueGame.O);
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