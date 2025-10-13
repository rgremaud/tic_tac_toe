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


function GameInit(playerOne, playerTwo) {
    const board = Gameboard();

    const players = [
        {
            name: playerOne,
            token: "X",
            score: 0
        },
        {
            name: playerTwo,
            token: "O",
            score: 0
        }
    ];

    const getPlayerInfo = () => players;

    let activePlayer = players[0];

    let winArray = [false, ""]

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const allEqual = arr => arr.every(v => v === arr[0]);

    const cellValue = function (cellNumber) {
        return board.printCell(cellNumber);
    }

    const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    const winCheck = function () {
        winCombos.forEach((combo) => {
            let x = cellValue(combo[0]);
            let y = cellValue(combo[1]);
            let z = cellValue(combo[2]);
            let arrayToCheck = [x, y, z];

            if (allEqual(arrayToCheck) === true && (arrayToCheck[0] === "X")) {
                winArray[0] = true;
                winArray[1] = "X";
                players[0].score += 1;
            } else if (allEqual(arrayToCheck) === true && (arrayToCheck[0] === "O")) {
                winArray[0] = true;
                winArray[1] = "O";
                players[1].score += 1;
            } else if (allItemsLengthOne(board.getBoard()) === true && winArray[0] === false) {
                winArray[0] = "draw";
            }
        });

        return winArray;
    };

    const winReset = function () {
        winArray[0] = false;
        winArray[1] = "";
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
        switchPlayer();
    };

    const resetGame = function () {
        board.resetBoard();
    }

    return {
        playRound,
        getActivePlayer,
        getPlayerInfo,
        resetGame,
        winCheck,
        winReset,
        getBoard: board.getBoard
    }
}


function ScreenController(playerOne, playerTwo) {

    const game = GameInit(playerOne, playerTwo);
    const players = game.getPlayerInfo();
    const playerTurn = document.querySelector("#activePlayer");
    const gameBoard = document.querySelector("#gameBoard");

    let isGameover = false;
    
    const updateScreen = function () {
        gameBoard.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurn.textContent = `${activePlayer.name}'s turn!`;

        printBoard(board);

        addColor();

        let winArray = game.winCheck();
        winConfirm(winArray, playerOne, playerTwo);

        refreshScores(players);

    }

    const winConfirm = function (winArray, playerOne, playerTwo) {
        if (winArray[0] === true && winArray[1] === "X") {
            playerTurn.textContent = `${playerOne} has won!`;
            playerTurn.style.color = "#1C325B";
            game.winReset();
            isGameover = true;
        } else if (winArray[0] === true && winArray[1] === "O") {
            playerTurn.textContent = `${playerTwo} has won!`;
            playerTurn.style.color = "#1C325B";
            game.winReset();
            isGameover = true;
        } else if (winArray[0] === "draw") {
            playerTurn.textContent = `Its a draw!`;
            playerTurn.style.color = "#1C325B";
            game.winReset();
            isGameover = true;
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

            square.addEventListener('click', () => addBoardToken(square));

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
            isGameover = false;
            resetClickEvent();
        })
    }

    const addBoardToken = function (square) {
        if (!isGameover) {
            if (square.textContent === "") {
                square.textContent = `${activePlayer.token}`;
                boardLocation = parseInt(square.id);
                game.playRound(boardLocation);
                updateScreen();
            }
        }
    }

    const displayPlayer = function (players) {
        const playerOneDisplay = document.getElementById("leftPlayer");
        const playerTwoDisplay = document.getElementById("rightPlayer");

        playerOneDisplay.textContent = `${players[0].name}`;
        playerTwoDisplay.textContent = `${players[1].name}`;
    }

    const refreshScores = function (players) {
        const playerOneScore = document.getElementById("leftPlayerScore");
        const playerTwoScore = document.getElementById("rightPlayerScore");

        playerOneScore.textContent = `Score: ${players[0].score}`;
        playerTwoScore.textContent = `Score: ${players[1].score}`;
    }

    const addColor = function () {
        for (let i = 0; i <= 8; i++) {
            const square = document.getElementById(`${i}`);

            if (square.textContent === "X") {
                square.style.color = "#9ABF80";
            } else {
                square.style.color = "#6A669D";
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
    
    displayPlayer(players);
    updateScreen();

}

function loadScreen () {

    const startButtonClickEvent = function () {
        const startButton = document.getElementById("startButton");
        const fullBoard = document.getElementById("fullBoard");
        const loadScreen = document.getElementById("loadScreen");
        
        startButton.addEventListener('click', () => {
            loadScreen.style.display = 'none';
            fullBoard.style.display = 'block';

            const playerOne = document.getElementById("playerOneInput").value
            const playerTwo = document.getElementById("playerTwoInput").value
            
            ScreenController(playerOne, playerTwo);
        })
    }

    startButtonClickEvent();
}

loadScreen();