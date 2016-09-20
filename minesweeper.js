document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
    cells: [
        {
            row: 0,
            col: 0,
            isMine: false,
            isMarked: false,
            surroundingMines: 0,
            hidden: true
        }, {
            row: 0,
            col: 1,
            isMine: false,
            isMarked: false,
            surroundingMines: 0,
            hidden: true
        }, {
            row: 0,
            col: 2,
            isMine: false,
            isMarked: false,
            surroundingMines: 0,
            hidden: true
        }, {
            row: 1,
            col: 0,
            isMine: false,
            isMarked: false,
            surroundingMines: 0,
            hidden: true
        }, {
            row: 1,
            col: 1,
            isMine: false,
            isMarked: false,
            surroundingMines: 0,
            hidden: true
        }, {
            row: 1,
            col: 2,
            isMine: true,
            isMarked: false,
            surroundingMines: 0,
            hidden: true
        }, {
            row: 2,
            col: 0,
            isMine: false,
            isMarked: false,
            surroundingMines: 0,
            hidden: true
        }, {
            row: 2,
            col: 1,
            isMine: false,
            isMarked: false,
            surroundingMines: 0,
            hidden: true
        }, {
            row: 2,
            col: 2,
            isMine: true,
            isMarked: false,
            surroundingMines: 0,
            hidden: true
        }
    ]
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard()
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
    var winner = false;
    for (var i = 0; i < board.cells.length; i++) {
        if (board.cells[i].isMine && board.cells[i].isMarked) {
            winner = true;
        } else if (board.cells[i].hidden) {
            winner = false;
        }
    }
    if (winner === true){
        lib.displayMessage('You win!');
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

function generateBoard () {
    var boardSize = Number(document.userBoard.boardsize.value);
    for (var a = 0; a < boardSize; a++) {
        for (var b = 0; b < boardSize; b++) {
            board.cells.push({
                col: a,
                row: b,
                isMine: Boolean(Math.floor(Math.random() * 2)),
                isMarked: false,
                hidden: true
            })
        }
    }

}