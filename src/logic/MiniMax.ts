import GameState, { State, ValueGame } from "./Rules";

export default function ComputerGame(board: ValueGame[][], turn: ValueGame) {
  let funcPlayer = turn === ValueGame.X ? GamerO : GamerX;
  let possible: [number, number][] = [];
  let cond =
    turn === ValueGame.X
      ? (a: number, b: number) => a > b
      : (a: number, b: number) => a < b;
  let minimax = turn === ValueGame.X ? -10 : 10;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === ValueGame._) {
        board[i][j] = turn;

        let aux = funcPlayer(board);
        if (cond(aux, minimax)) {
          minimax = aux;
          possible = [[i, j]];
        }
        if (aux === minimax) possible.push([i, j]);

        board[i][j] = ValueGame._;
      }
    }
  }

  let play = possible[Math.floor(Math.random() * possible.length)];
  board[play[0]][play[1]] = turn;
}

function GamerX(board: ValueGame[][]): number {
  let game = GameState(board);
  if (game === State.Win) return -1;
  if (game === State.EndGame) return 0;
  let minmax = -10;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === ValueGame._) {
        board[i][j] = ValueGame.X;
        minmax = Math.max(minmax, GamerO(board));
        board[i][j] = ValueGame._;
        if (minmax === 1) return 1;
      }
    }
  }

  return minmax;
}

function GamerO(board: ValueGame[][]): number {
  let game = GameState(board);
  if (game === State.Win) return 1;
  if (game === State.EndGame) return 0;
  let minmax = 10;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === ValueGame._) {
        board[i][j] = ValueGame.O;
        minmax = Math.min(minmax, GamerX(board));
        board[i][j] = ValueGame._;
        if (minmax === -1) return -1;
      }
    }
  }

  return minmax;
}
