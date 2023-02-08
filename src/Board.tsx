import { valueGameToString, ValueGame } from "./Rules";

const Square = ({ value, onClick }: { value: string, onClick: Function }) =>
    <button className="square" onClick={() => onClick()}>{value}</button>

const Board = ({ squares, turn, actGame }: { squares: ValueGame[][], turn: ValueGame, actGame: Function }) => {

    const handleClick = (x: number, y: number) => () => {
        if (squares[x][y] != ValueGame._) return;

        squares[x][y] = turn;

        actGame();
    }

    const renderSquare = (x: number, y: number) =>
        <Square value={valueGameToString(squares[x][y])} onClick={handleClick(x, y)} />

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
    );
}

export default Board;