'use strict'

console.log('EX 56')
console.log('Symmetric Matrix')
// reviewed ✔️

// Symmetric Matrix:
// A symmetric matrix is a matrix that passes this boolean condition:
// mat[i][j] === mat[j][i]
// Write the function checkIfSymmetric(mat).

var symmetricMat = [
  [1, 2, 3],
  [2, 0, 2],
  [3, 2, 8],
]



var asymmetricMat = [
  [2, 0, 0, 0, 0],
  [0, 5, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
]

console.log('INPUT:')
console.table(symmetricMat)
console.log('EXPECTED: true')
console.log('ACTUAL:', checkIfSymmetric(symmetricMat))
console.log('INPUT:')
console.table(asymmetricMat)
console.log('EXPECTED: false')
console.log('ACTUAL:', checkIfSymmetric(asymmetricMat))

function checkIfSymmetric(mat) {
  for (var i = 0; i < mat.length - 1; i++) {
    for (var j = i + 1; j < mat[0].length; j++) {
      if (mat[i][j] !== mat[j][i]) return false
    }
  }
  return true
}

