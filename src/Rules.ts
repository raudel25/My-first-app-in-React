export enum State {
    Win,
    ContinueGame,
    EndGame,
}

export enum Turn {
    X,
    O,
}

function GameState(board: string[][]): State {
    let game = Rows(board);
    if (game != State.ContinueGame) return game;
    game = Columns(board);
    if (game != State.ContinueGame) return game;
    game = Diagonal(board);
    if (game != State.ContinueGame) return game;
    game = End(board);
    if (game != State.ContinueGame) return game;
    return State.ContinueGame;
}

function Rows(board: string[][]): State {
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] == " ") continue;
        let win = true;

        for (let j = 1; j < board.length; j++) {
            if (board[i][0] != board[i][j]) win = false;
        }

        if (win) return State.Win;
    }

    return State.ContinueGame;
}

function Columns(board: string[][]): State {
    for (let i = 0; i < board.length; i++) {
        if (board[0][i] == " ") continue;
        let win = true;
        for (let j = 1; j < board.length; j++) {
            if (board[0][i] != board[j][i]) win = false;
        }

        if (win) return State.Win;
    }

    return State.ContinueGame;
}

function End(board: string[][]): State {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == " ") return State.ContinueGame;
        }
    }

    return State.EndGame;
}

function Diagonal(board: string[][]): State {
    let winLeft = (board[0][0] != " ");
    let winRight = (board[0][board.length - 1] != " ");
    for (let i = 1; i < board.length; i++) {
        if (board[0][0] != board[i][i]) winLeft = false;
        if (board[0][board.length - 1] != board[i][board.length - 1 - i]) winRight = false;
    }

    if (winLeft || winRight) return State.Win;
    return State.ContinueGame;
}

export default GameState;