'use strict'

console.log('EX 55');
console.log('Fill up a multi-dimensional array with numbers, and then, Sharon.');
// reviewed ✔️

// 55.Fill up a multi-dimensional array with numbers, and then, Write the following
// functions:
// a. sumCol(mat, colIdx)
// b. sumRow(mat, rowIdx)
// c. findMax(mat, colIdx)
// d. findAvg(mat)
// e. sumArea(mat, rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd)
//*************************** ?????????????IS MATRIX OR MULTI-DIMENSIONAL ARRAY?????? ***************************
var mat = [
    [8, 6, 7, 4, 2],
    [3, 6, 9, 1, 6],
    [5, 8, 7, 3, 2],
    [3, 1, 7, 4, 0],
]
console.table(mat)
console.log('INPUT: sumCol(mat, 1)');
console.log('EXPECTED: 21');
console.log('ACTUAL:', sumCol(mat, 1));
console.log('~~~~~~~~~~~~~~');
console.log('INPUT: sumRow(mat, 1)');
console.log('EXPECTED: 25');
console.log('ACTUAL:', sumRow(mat, 1));
console.log('~~~~~~~~~~~~~~');
console.log('INPUT: findMax(mat, 1)');
console.log('EXPECTED: 8');
console.log('ACTUAL:', findMax(mat, 1));
console.log('~~~~~~~~~~~~~~');
console.log('INPUT: findAvg(mat)');
console.log('EXPECTED: 4.6');
console.log('ACTUAL:', findAvg(mat));
console.log('~~~~~~~~~~~~~~');
console.log('INPUT: sumArea(mat, 1, 3, 1, 3)');
console.log('EXPECTED: 46');
console.log('ACTUAL:', sumArea(mat, 1, 3, 1, 3));


function sumCol(mat, colIdx) {
    var sum = 0
    for (var i = 0; i < mat.length; i++) {
        sum += mat[i][colIdx];
    }
    return sum
}

function sumRow(mat, rowIdx) {
    var sum = 0
    for (var i = 0; i < mat[rowIdx].length; i++) {
        sum += mat[rowIdx][i]
    }
    return sum
}

//in a matrix rows are simple arrays
function sumRow2(row) {
    var sum = 0
    for (var i = 0; i < row.length; i++) {
        sum += row[i]
    }
    return sum
}

function findMax(mat, colIdx) {
    var max = -Infinity
    for (var i = 0; i < mat.length; i++) {
        var currCell = mat[i][colIdx]
        if (currCell > max) max = currCell
    }
    return max
}

function findAvg(mat) {
    var sum = 0
    for (var i = 0; i < mat.length; i++) {
        sum += sumRow(mat, i)
    }
    var cellCount = mat.length * mat[0].length
    return sum / cellCount
}

function sumArea(mat, rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd) {

    var sum = 0
    for (var i = rowIdxStart; i <= rowIdxEnd; i++) {
        for (var j = colIdxStart; j <= colIdxEnd; j++) {
            sum += mat[i][j]
        }
    }
    return sum
}