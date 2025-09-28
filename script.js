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
    const board = ["","","","","","","","",""];

    const playToken = function(board_spot, token) {
        let index = board_spot
        if (board[index].length == 0 ) { 
            board[index] = token;
        } else if (board[index].length > 0) {
        alert("That spot is taken!");
    }};

 /*
 const printBoard = function() {
    console.log(gameBoard[0] + gameBoard[1] + gameBoard[2]);
    console.log(gameBoard[3] + gameBoard[4] + gameBoard[5]);
    console.log(gameBoard[6] + gameBoard[7] + gameBoard[8]);
 }
 }
*/
    return { playToken }
};