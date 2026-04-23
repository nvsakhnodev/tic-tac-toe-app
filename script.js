const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const resetScoreBtn = document.getElementById("resetScoreBtn");

let scoreX = 0;
let scoreO = 0;

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    checkWinner();
}

function checkWinner() {
    for (let combination of winCombinations) {
        const [a, b, c] = combination;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            if (currentPlayer === "X") {
                scoreX++;
                scoreXEl.textContent = scoreX;
            } else {
                scoreO++;
                scoreOEl.textContent = scoreO;
            }

            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "win");
    });
}

function resetScore() {
    scoreX = 0;
    scoreO = 0;
    scoreXEl.textContent = scoreX;
    scoreOEl.textContent = scoreO;
}

cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
resetScoreBtn.addEventListener("click", resetScore);