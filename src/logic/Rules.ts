export enum State {
  Win,
  ContinueGame,
  EndGame,
}

export enum ValueGame {
  X,
  O,
  _,
}

export const valueGameToString = (value: ValueGame) =>
  value === ValueGame.X ? "X" : value === ValueGame.O ? "O" : " ";

function GameState(board: ValueGame[][]): State {
  let game = Rows(board);
  if (game !== State.ContinueGame) return game;
  game = Columns(board);
  if (game !== State.ContinueGame) return game;
  game = Diagonal(board);
  if (game !== State.ContinueGame) return game;
  game = End(board);
  if (game !== State.ContinueGame) return game;
  return State.ContinueGame;
}

function Rows(board: ValueGame[][]): State {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === ValueGame._) continue;
    let win = true;

    for (let j = 1; j < board.length; j++) {
      if (board[i][0] !== board[i][j]) win = false;
    }

    if (win) return State.Win;
  }

  return State.ContinueGame;
}

function Columns(board: ValueGame[][]): State {
  for (let i = 0; i < board.length; i++) {
    if (board[0][i] === ValueGame._) continue;
    let win = true;
    for (let j = 1; j < board.length; j++) {
      if (board[0][i] !== board[j][i]) win = false;
    }

    if (win) return State.Win;
  }

  return State.ContinueGame;
}

function End(board: ValueGame[][]): State {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === ValueGame._) return State.ContinueGame;
    }
  }

  return State.EndGame;
}

function Diagonal(board: ValueGame[][]): State {
  let winLeft = board[0][0] !== ValueGame._;
  let winRight = board[0][board.length - 1] !== ValueGame._;
  for (let i = 1; i < board.length; i++) {
    if (board[0][0] !== board[i][i]) winLeft = false;
    if (board[0][board.length - 1] !== board[i][board.length - 1 - i])
      winRight = false;
  }

  if (winLeft || winRight) return State.Win;
  return State.ContinueGame;
}

export default GameState;
