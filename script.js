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

 
    const printBoard = function() {
        console.log(board[0] + board[1] + board[2]);
        console.log(board[3] + board[4] + board[5]);
        console.log(board[6] + board[7] + board[8]);
    };

    return { playToken, printBoard };
};