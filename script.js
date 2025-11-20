const gameboard = (function () {
    const board = [["","",""],["","",""],["","",""]];

    const cleanBoard = () => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                board[r][c] = "";
            }
        }
    };

    const playMove = (row, col, symbol) => {
        if (board[row][col] === "") {
            board[row][col] = symbol;
            return true;
        }
        return false;
    };

    const getBoard = () => board;

    const checkWinner = () => {
        for (let r = 0; r < 3; r++) {
            if (board[r][0] && board[r][0] === board[r][1] && board[r][1] === board[r][2]) 
                return board[r][0];
        }
        for (let c = 0; c < 3; c++) {
            if (board[0][c] && board[0][c] === board[1][c] && board[1][c] === board[2][c]) 
                return board[0][c];
        }
        if (board[1][1]) {
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[1][1];
            if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[1][1];
        }
        return null;
    };

    const isDraw = () => board.flat().every(c => c !== "") && !checkWinner();

    return { playMove, cleanBoard, getBoard, checkWinner, isDraw };
})();

let player1, player2, currentPlayer;

const displayController = (function () {
    const pregameContainer = document.getElementById("pregame");
    const boardContainer = document.getElementById("board");
    const btnStart = document.getElementById("btnStart");

    btnStart.addEventListener("click", () => {
        player1 = createPlayer(prompt("Player 1 name"), "X");
        player2 = createPlayer(prompt("Player 2 name"), "O");
        currentPlayer = player1;

        pregameContainer.innerHTML = "";
        boardContainer.innerHTML = `
            ${Array.from({ length: 3 }).map((_, r) =>
                Array.from({ length: 3 }).map((_, c) =>
                    `<div class="cell" data-row="${r}" data-col="${c}"></div>`
                ).join("")
            ).join("")}
        `;

        addCellListeners();
    });

    const addCellListeners = () => {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.addEventListener("click", () => handleMove(cell));
        });
    };

    const handleMove = (cell) => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;

        if (!gameboard.playMove(row, col, currentPlayer.symbol)) return;

        update();

        if (gameboard.checkWinner()) {
            alert(`${currentPlayer.name} wins!`);
            return;
        }

        if (gameboard.isDraw()) {
            alert("Draw!");
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const update = () => {
        const board = gameboard.getBoard();
        document.querySelectorAll(".cell").forEach(cell => {
            const r = cell.dataset.row;
            const c = cell.dataset.col;
            cell.textContent = board[r][c];
        });
    };

    return { update };
})();

function createPlayer(name, symbol) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    return { name, symbol, getScore, increaseScore };
}
