const gameboard = (function () {
    const board = [ ["","",""],
                    ["","",""],
                    ["","",""]];
    
    const cleanBoard = () => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                board[r][c] = "";
            }
        }
    };

    const playMove = (row, column, symbol) => {
        board[row][column] = symbol;
    }

    const isDraw = () => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === "") return false;
            }
        }
        return checkWinner() === null;
    };


    const getBoard = () => board;

    const checkWinner = () => {
        for (let r = 0; r < 3; r++) {
            if (board[r][0] !== "" &&
                board[r][0] === board[r][1] &&
                board[r][1] === board[r][2]) {
                return board[r][0];
            }
        }

        for (let c = 0; c < 3; c++) {
            if (board[0][c] !== "" &&
                board[0][c] === board[1][c] &&
                board[1][c] === board[2][c]) {
                return board[0][c];
            }
        }

        if (board[1][1] !== "") {
            if (
                board[0][0] === board[1][1] &&
                board[1][1] === board[2][2]
            ) {
                return board[1][1];
            }

            if (
                board[0][2] === board[1][1] &&
                board[1][1] === board[2][0]
            ) {
                return board[1][1];
            }
        }

        return null;
    };

    return {playMove, cleanBoard, getBoard, checkWinner, isDraw}
})();

const displayController = (function () {
    
})();

function createPlayer (name, symbol) {
    let score = 0;

    const getScore = () => score;

    const increaseScore = () => score++;
    return {name, symbol, getScore, increaseScore};
}

let player1 = createPlayer(prompt("Enter Player 1 name."), "X");
let player2 = createPlayer(prompt("Enter Player 2 name."), "O");

let currentPlayer = player1;

while (!gameboard.checkWinner() && !gameboard.isDraw()) {
    console.log(gameboard.getBoard());

    let row = parseInt(prompt(`${currentPlayer.name} (${currentPlayer.symbol}) - row (0,1,2):`));
    let col = parseInt(prompt(`${currentPlayer.name} (${currentPlayer.symbol}) - column (0,1,2):`));

    if (gameboard.getBoard()[row][col] !== "") {
        console.log("Invalid move! Try again.");
        continue;
    }

    gameboard.playMove(row, col, currentPlayer.symbol);

    if (!gameboard.checkWinner() && !gameboard.isDraw()) {
        console.log(gameboard.getBoard());
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
}

console.log(gameboard.getBoard());
console.log(`Winner: ${gameboard.checkWinner()}`);