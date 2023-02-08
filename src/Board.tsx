import { State, Turn } from "./Rules";

const Square = ({ value, onClick }: { value: string, onClick: Function }) =>
    <button className="square" onClick={() => onClick()}>{value}</button>

const Board = ({ squares, state, turn, actGame }: { squares: string[][], state: State, turn: Turn, actGame: Function }) => {

    const handleClick = (x: number, y: number) => () => {
        if (squares[x][y] != ' ' || state != State.ContinueGame) return;

        squares[x][y] = turn == Turn.X ? 'X' : 'O';

        actGame();
    }

    const renderSquare = (x: number, y: number) =>
        <Square value={squares[x][y]} onClick={handleClick(x, y)} />

    return (
        <>
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
        </>
    )
}

export default Board;