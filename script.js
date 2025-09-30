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

    const printCell = function (cellNumber) {
        return board[cellNumber]
    }

    return { playToken, printBoard, printCell };
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
        //getBoard: board.getBoard
    }
}