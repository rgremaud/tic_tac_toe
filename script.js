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
                alert("We have a winner!")
            }
            else {
            }
        });
    };


    const playRound = function () {
        for (let i = 0; i <= 10; i++) {
            while (!winCondition) {
                // Look at updating the logic here for the javascript to handle the click events
                /* removing the console functions
                console.log(`It is ${getActivePlayer().name}'s turn.`)
                boardLocation = prompt("Please enter the number you'd like to play your token.  Number 0-8")
                */
               // update board.playToken to accept the click event version
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
    const playerTurn = document.querySelector("#activePlayer")
    const gameBoard = document.querySelector("#gameBoard")

    const updateScreen = function () {
        // clear the board
        gameBoard.textContent = "";

        // get latest board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        playerTurn.textContent = `${activePlayer.name}'s turn!`;

        // Build divs for board
       for (let i = 0; i <= 8; i++) {
            const newDiv = document.createElement('div');
            newDiv.id = `${i}`;
            newDiv.className = "square";
            newDiv.textContent = `${board[i]}`;
            gameBoard.appendChild(newDiv);
       }

       // Add click events to board squares
       for (let i =0; i <= 8; i++) {
            const square = document.getElementById(`${i}`);

            square.addEventListener('click', () => { 
                square.textContent = `${activePlayer.token}`;
                // needs to include the playtoken call here
                boardLocation = parseInt(square.id);
                console.log(boardLocation);
            });

            square.addEventListener('mouseenter', () => {
                square.classList.add('hover');
            });

            square.addEventListener('mouseleave', () => {
                square.classList.remove('hover');
            });
        }

    }
    
    // add a click events for each item
    // click event should add event listener that recognizes the click, identifies the player
    // plays the token at the location
    // calls the updateScreen
    /*
    const squareClickEvent = function () {
        for (let i =0; i <= 8; i++) {
            console.log("Hi");
            const square = document.getElementById(`${i}`);

            square.addEventListener('click', function() {
                myElement.style.backgroundColor = 'blue'; 
            });
        }
    }
    */

    updateScreen();

}

ScreenController();