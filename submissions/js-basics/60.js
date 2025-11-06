'use strict'

console.log('Ex 60 Solution - NEVO SOLUTION')

// const TABLE_LENGTH = 10
const EMPTY = ''
const LIFE = '👼🏼'
const MAXGEN = 10

var gBoard = []
var gGenCnt = 2

// var gBoard = []
console.clear()
// var gGenCnt = 2
makeFirstBoard()
var interID = setInterval(play, 1000)
setTimeout(() => clearInterval(interID), 8000)

function renderBoard(gBoard) {
    // console.clear()
    console.table(gBoard)
}

function makeFirstBoard() {
    var rowNum = +prompt('Enter number of rows')
    var colNum = +prompt('Enter number of columns')
    for (var i = 0; i < rowNum; i++) {
        gBoard[i] = []
        for (var j = 0; j < colNum; j++) {
            if (Math.random() > 0.7) gBoard[i][j] = LIFE
            else gBoard[i][j] = EMPTY
        }
    }
    console.log('FIRST GENERATION')
    renderBoard(gBoard)
}

function runGeneration() {
    var nextGen = gBoard.slice()
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i]
        for (var j = 0; j < row.length; j++) {
            var cell = row[j]
            var neighborNum = getNeighbors(i, j)
            if (cell === LIFE) {
                if (neighborNum <= 2) nextGen[i][j] = EMPTY
                else if (neighborNum >= 6) nextGen[i][j] = EMPTY
            } else {
                if (neighborNum >= 3 && neighborNum <= 5) nextGen[i][j] = LIFE
            }
        }
    }
    return nextGen
}

function getNeighbors(rowId, colId) {
    var neighborCnt = 0
    for (var i = rowId - 1; i <= rowId + 1; i++) {
        // if i is out of bounderies - go to the next i
        if (i < 0 || i > gBoard.length - 1) continue //continue to the next i

        for (var j = colId - 1; j <= colId + 1; j++) {
            // if j is out of bounderies - go to the next j:
            if (j < 0 || j > gBoard[0].length - 1) continue // continue to the next j.

            if (i === rowId && j === colId) continue

            if (gBoard[i][j] === LIFE) neighborCnt++
        }
    }
    return neighborCnt
}

function isOver() {
    for (var i = 0; i < gBoard.length; i++) {
        const row = gBoard[i]
        for (var j = 0; j < gBoard[0].length; j++) {
            const col = gBoard[i][j]
            if (col === LIFE) return false
        }
    }
    return true
}

function play() {
    console.log('GENERATION  ', gGenCnt)
    gBoard = runGeneration()
    renderBoard(gBoard)
    if (isOver()) {
        console.log('LIFE IS GONE ! !')
        clearInterval(interID)
    }
    gGenCnt++
}
