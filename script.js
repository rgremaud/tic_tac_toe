function Gameboard() {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const playToken = function (board_spot, token) {
        let index = board_spot;
        if (board[index].length == 0) {
            board[index] = token;
        } else if (board[index].length > 0) {
            alert("That spot is taken!");
        }
    };

    const printCell = function (cellNumber) {
        return board[cellNumber];
    };

    const resetBoard = function () {
        for (let i = 0; i <= 8; i++) {
            board[i] = "";
        }
    };

    return {
        getBoard,
        playToken,
        printCell,
        resetBoard
    };
};


function GameInit() {
    const board = Gameboard();

    const players = [
        {
            name: "Player X",
            token: "X"
        },
        {
            name: "Player O",
            token: "O",
        }
    ];

    const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    let activePlayer = players[0];
    let winCondition = false;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const allEqual = arr => arr.every(v => v === arr[0]);

    const cellValue = function (cellNumber) {
        return board.printCell(cellNumber);
    }

    const winCheck = function () {
        winCombos.forEach((combo) => {
            let x = cellValue(combo[0]);
            let y = cellValue(combo[1]);
            let z = cellValue(combo[2]);
            let arrayToCheck = [x, y, z];

            if (allEqual(arrayToCheck) === true && (arrayToCheck[0] === "X" || arrayToCheck[0] === "O")) {
                winCondition = true;
            }
        });

        if (allItemsLengthOne(board.getBoard()) === true && winCondition === false) {
            winCondition = "draw";
            return winCondition;
        }

        return winCondition;
    };

    const winReset = function () {
        winCondition = false;
    }

    const allItemsLengthOne = function (arr) {
        if (arr.length === 0) {
            return true;
        }

        return arr.every(item => {
            return typeof item === 'string' && item.length === 1;
        });
    }

    const playRound = function (location) {
        board.playToken(location, getActivePlayer().token);
        winCheck();
        switchPlayer();
    };

    const resetGame = function () {
        board.resetBoard();
    }

    return {
        playRound,
        getActivePlayer,
        resetGame,
        winCheck,
        winReset,
        getBoard: board.getBoard
    }
}


function ScreenController() {
    const game = GameInit();
    const playerTurn = document.querySelector("#activePlayer");
    const gameBoard = document.querySelector("#gameBoard");

    const updateScreen = function () {
        gameBoard.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurn.textContent = `${activePlayer.name}'s turn!`;

        printBoard(board);

        addColor();

        let winCheck = game.winCheck();
        winConfirm(winCheck);

    }

    const winConfirm = function (winCheck) {
        if (winCheck === true) {
            if (activePlayer.token === "X") {
                playerTurn.textContent = `Player O has won!`;
            } else {
                playerTurn.textContent = `Player X has won!`;
            }
            playerTurn.style.color = "#EA906C";
            game.winReset();
        } else if (winCheck === "draw") {
            playerTurn.textContent = `Its a draw!`;
            playerTurn.style.color = "#EA906C";
            game.winReset();
        };
    }

    const printBoard = function (board) {
        for (let i = 0; i <= 8; i++) {
            const newSquare = document.createElement('div');
            newSquare.id = `${i}`;
            newSquare.className = "square";
            newSquare.textContent = `${board[i]}`;
            gameBoard.appendChild(newSquare);
        }

        for (let i = 0; i <= 8; i++) {
            const square = document.getElementById(`${i}`);

            square.addEventListener('click', () => {
                if (square.textContent === "") {
                    square.textContent = `${activePlayer.token}`;
                    boardLocation = parseInt(square.id);
                    game.playRound(boardLocation);
                    updateScreen();
                } else {
                }
            });

            square.addEventListener('mouseenter', () => {
                square.classList.add('hover');
            });

            square.addEventListener('mouseleave', () => {
                square.classList.remove('hover');
            });
        }

        const resetButton = document.getElementById('resetButton');
        resetButton.textContent = "Reset";

        resetButton.addEventListener('click', () => {
            resetClickEvent();
        })
    }

    const addColor = function () {
        for (let i = 0; i <= 8; i++) {
            const square = document.getElementById(`${i}`);

            if (square.textContent === "X") {
                square.style.color = "#B31312";
            } else {
                square.style.color = "#2B2A4C";
            }
        };
    }

    const resetClickEvent = function () {
        const playerTurn = document.getElementById("activePlayer");
        const gameBoard = document.getElementById("gameBoard");
        playerTurn.textContent = "";
        playerTurn.style.color = "#2B2A4C";
        gameBoard.textContent = "";
        game.resetGame();
        updateScreen();
    }

    updateScreen();

}

ScreenController();

/* 
To do list:
    Allow players to input their name
    Keep track of score for each
*/