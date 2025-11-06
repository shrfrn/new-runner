// console.log('ex 58');
/*
Write a function which receives a 2D array, and tests whether it is a magic square:
a. It must be a square
b. The sums of the rows, columns, and the two diagonals should all be equal. For example:
' */

console.log('58 - is magic square? ')
const mat1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
const mat2 = [
    [2, 7, 6],
    [9, 5, 1],
    [4, 3, 8],
]

const res1 = isMagicSquare(mat1)
console.log('INPUT: ', mat1)
console.log('EXPECTED:', false)
console.log('ACTUAL:', res1)
console.table(mat1);

const res2 = isMagicSquare(mat2)
console.log('INPUT: ', mat2)
console.log('EXPECTED:', true)
console.log('ACTUAL:', res2)
console.table(mat2);


function isMagicSquare(mat) {
    if (!isSquare(mat)) return false

    var sum = getSumPrDiagonal(mat)
    if(sum !== getSumSecDiagonal(mat)) return false
    
    for (var i = 0; i < mat.length; i++) {
        if (getSumRow(mat, i) !== sum) return false
        if (getSumCol(mat, i) !== sum) return false
    }
    return true
}

function isSquare(mat) {
    for (var i = 0; i < mat.length; i++) {
        if (mat.length !== mat[i].length) return false
    }
    return true
}

function getSumRow(mat, rowIdx) {
    var sum = 0
    for (var i = 0; i < mat.length; i++) {
        sum += mat[rowIdx][i]
    }
    return sum
}

function getSumCol(mat, colIdx) {
    var sum = 0
    for (var i = 0; i < mat.length; i++) {
        sum += mat[i][colIdx]
    }
    return sum
}

function getSumPrDiagonal(mat) {
    var sum = 0
    for (var i = 0; i < mat.length; i++) {
        sum += mat[i][i]
    }
    return sum
}

function getSumSecDiagonal(mat) {
    var sum = 0
    for (var i = 0; i < mat.length; i++) {
        sum += mat[i][mat[i].length - 1 - i]
    }
    return sum
}
