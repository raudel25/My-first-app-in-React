import GameState, { State, ValueGame, valueGameToString } from "../logic/Rules";
import { useState } from "react";

export const useGameState = () => {
    const game: ValueGame[][] = new Array(3);

    for (let i = 0; i < 3; i++) {
        game[i] = new Array(3);

        for (let j = 0; j < 3; j++) {
            game[i][j] = ValueGame._;
        }
    }

    const [squares, setSquares] = useState(game.slice());
    const [message, setMessage] = useState('Next Player: X');
    const [turn, setTurn] = useState(ValueGame.X);
    const [state, setState] = useState(State.ContinueGame);

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
        setMessage(actMessage);
        setState(GameState(squares));
        setTurn(actTurn);
    }

    const newGame = () => {
        setSquares(game.slice());
        setMessage('Next Player: X');
        setTurn(ValueGame.X);
        setState(State.ContinueGame);
    }

    return { squares, turn, state, message, actGame, newGame };
}