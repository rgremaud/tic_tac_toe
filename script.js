/*

Required components:
Gameboard
    - Array with 9 spots
    - Exposed elements getboard, playtoken, print board
Game controller 
    - Players defined here
    - Game logic to check for winner
    - Exposed elements play round, active player
*/


function Gameboard() {
    const board = ["", "", "", "", "", "", "", "", ""];

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

    return { playToken, printBoard };
};


function GameGenie(playerOne, playerTwo) {
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

    const winCheck = function () {
        /*
        winCombos.forEach((combo) => {
            console.log(`Current values are `)
            // need to update this so it is taking the combo
            arrayToCheck = [board[combo[0]], board[combo[1]], board[combo[2]]]
            console.log(`Array to check is ${arrayToCheck}`);
            if (allEqual(arrayToCheck) === "true" && (arrayToCheck[0] === "X" || arrayToCheck[0] === "O")) {
                winCondition = true;
            }
            else {
                console.log("No winner yet")
            } 
        }); */
    };


    const playRound = function () {
        while (!winCondition) {
            console.log(`It is ${getActivePlayer().name}'s turn.`)
            boardLocation = prompt("Please enter the number you'd like to play your token.  Number 0-9")
            board.playToken(parseInt(boardLocation), getActivePlayer().token);
            winCheck();
            board.printBoard();
        }
    }

    return {
        playRound,
        getActivePlayer,
        winCheck,
        getBoard: board.getBoard
    }
}