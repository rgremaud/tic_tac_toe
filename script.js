function Gameboard() {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const playToken = function (board_spot, token) {
        let index = board_spot
        if (board[index].length == 0) {
            board[index] = token;
        } else if (board[index].length > 0) {
            alert("That spot is taken!");
        }
    };

    const printBoard = function () {
        console.log(board[0] + "|" + board[1] + "|" + board[2]);
        console.log(board[3] + "|" + board[4] + "|" + board[5]);
        console.log(board[6] + "|" + board[7] + "|" + board[8]);
    };

    const printCell = function (cellNumber) {
        return board[cellNumber]
    }

    return { getBoard, playToken, printBoard, printCell };
};


function GameInit(playerOne, playerTwo) {
    const board = Gameboard()

    const players = [
        {
            name: playerOne,
            token: "X"
        },
        {
            name: playerTwo,
            token: "O",
        }
    ];

    const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    let activePlayer = players[0]
    let winCondition = false;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const allEqual = arr => arr.every(v => v === arr[0]);

    const cellValue = function (cellNumber) {
        return board.printCell(cellNumber)
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
            else {
            }
        });
    };


    const playRound = function () {
        for (let i = 0; i <= 10; i++) {
            while (!winCondition) {
                console.log(`It is ${getActivePlayer().name}'s turn.`)
                boardLocation = prompt("Please enter the number you'd like to play your token.  Number 0-8")
                board.playToken(parseInt(boardLocation), getActivePlayer().token);
                winCheck();
                switchPlayer();
                board.printBoard();
            }
            if (i === 9) {
                return alert("Its a draw!");
            }
        }
    }

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    }
}

function ScreenController() {
    const game = GameInit("Player X", "Player O");
    const playerTurnId = document.getElementById("activePlayer")
    const fullBoardId = document.getElementById("fullBoard")

    const updateScreen = function () {
        // clear the board
        fullBoardId.textContent = "";

        // get latest board and player turn
        const board = game.getBoard;
        console.log(board)
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        playerTurnId.textContent = `${activePlayer.name}'s turn!`

        // Render board squares
        // should display the data in each square across the board


    }

    // add a click events for each item

    updateScreen();

}

ScreenController();

/*
Example screen controller from building a house article
function ScreenController() {
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    // Render board squares
    board.forEach(row => {
      row.forEach((cell, index) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function 
        cellButton.dataset.column = index
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      })
    })
  }

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn) return;
    
    game.playRound(selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
}
ScreenController();
*/