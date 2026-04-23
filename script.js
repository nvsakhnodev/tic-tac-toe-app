const cells = document.querySelectorAll(".cell"); 
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winCombinations = [ //индексы массива board 
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
    const index = cell.dataset.index; // получаю индекс клетки, на которую нажал

    if (board[index] !== "" || !gameActive) { //проверка если клетка занята или игра закончена 
        return;
    }

    board[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); //добавляем класс х или о в зависимости от победителя 
    checkWinner();
}

function checkWinner() {
    for (let combination of winCombinations) { 
        const [a, b, c] = combination;

        if ( //Если клетка a не пустая и она равна клетке b И она равна клетке c
            board[a] && // не пустое 
            board[a] === board[b] && //строгое сравнение 
            board[a] === board[c] // так же для третьей клетки
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

    if (!board.includes("")) { //ничья при всех не пустых клетках
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; //тернарный оператор 
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
    cell.addEventListener("click", handleCellClick); //jjjjобратотчик кликов для каждой ячейки 
});

restartBtn.addEventListener("click", restartGame); //то же для каждой кнопки
resetScoreBtn.addEventListener("click", resetScore);