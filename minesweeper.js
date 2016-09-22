document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
    cells: []
}

//Load board and create on DOM
function startGame () {
    board.cells.length = 0;
    generateBoard();
    addCountMines();
    lib.initBoard();
    document.addEventListener('click', checkForWin);
    document.addEventListener('contextmenu', checkForWin);
}

// Populates the Board object with cells
function generateBoard () {
    var boardSize = Number(document.userBoard.boardsize.value) || 4;
    for (var a = 0; a < boardSize; a++) {
        for (var b = 0; b < boardSize; b++) {
            board.cells.push({
                col: a,
                row: b,
                isMine: Boolean(Math.floor(Math.random() * 1.2)),
                isMarked: false,
                hidden: true
            })
        }
    }
}

//Adding a surrounding mines property to each cell
function addCountMines () {
    for (var i = 0; i < board.cells.length; i++) {
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    }
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
    var winner = true;
    var winSound = document.getElementById("win");
    for (var i = 0; i < board.cells.length; i++) {
        if (board.cells[i].isMine && !board.cells[i].isMarked) {
            winner = false;
            break;
        } else if (!board.cells[i].isMine && board.cells[i].hidden) {
            winner = false;
            break;
        }
    }
    if (winner === true){
        lib.displayMessage('You win!');
        winSound.play();
        document.removeEventListener('click', checkForWin);
        document.removeEventListener('contextmenu', checkForWin);
        lib.removeListeners();
    }
}

//Counts the cells that contain mines around the current one
function countSurroundingMines (cell) {
    var surrounding = lib.getSurroundingCells(cell.row, cell.col);
    var count = 0;
    for (var i = 0; i < surrounding.length; i++) {
        if (surrounding[i].isMine === true) {
            count += 1;
        }
    }
    return count;
}

