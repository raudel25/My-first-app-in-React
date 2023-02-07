import GameState, { State } from "./Rules";

export default function ComputerGame(board: string[][], player: string) {
    let funcPlayer = player == 'X' ? GamerO : GamerX;
    let possible: [number, number][] = []
    let cond = player == 'X' ? (a: number, b: number) => a > b : (a: number, b: number) => a < b;
    let minimax = player == 'X' ? -10 : 10;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == " ") {
                board[i][j] = player;

                let aux = funcPlayer(board);
                if (cond(aux, minimax)) {
                    minimax = aux;
                    possible = [[i, j]]
                }
                if (aux == minimax) possible.push([i, j]);

                board[i][j] = " ";
            }
        }
    }

    let play = possible[Math.floor(Math.random() * possible.length)];
    board[play[0]][play[1]] = player;
}

function GamerX(board: string[][]): number {
    let game = GameState(board);
    if (game == State.Win) return -1;
    if (game == State.EndGame) return 0;
    let minmax = -10;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == " ") {
                board[i][j] = "X";
                minmax = Math.max(minmax, GamerO(board));
                board[i][j] = " ";
                if (minmax == 1) return 1;
            }
        }
    }

    return minmax;
}

function GamerO(board: string[][]): number {
    let game = GameState(board);
    if (game == State.Win) return 1;
    if (game == State.EndGame) return 0;
    let minmax = 10;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == " ") {
                board[i][j] = "O";
                minmax = Math.min(minmax, GamerX(board));
                board[i][j] = " ";
                if (minmax == -1) return -1;
            }
        }
    }

    return minmax;
}