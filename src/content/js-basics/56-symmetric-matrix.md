# Exercise 56: Symmetric Matrix

## Instructions
In this exercise, you will:
1. Implement the function `checkIfSymmetric(mat)` which checks if a matrix is symmetric
2. A matrix is symmetric if it passes this condition: `mat[i][j] === mat[j][i]`
3. The function should return true if the matrix is symmetric, false otherwise

## Example
For a symmetric matrix:
```
1  2  3
2  4  5
3  5  6
```
The function should return `true` because for every two valid indices of the matrix `(i, j)`, `mat[i][j] === mat[j][i]`. 

for example:

- mat[0][1] === mat[1][0] (2 === 2)
- mat[0][2] === mat[2][0] (3 === 3)
- mat[1][2] === mat[2][1] (5 === 5)

For a non-symmetric matrix:
```
1  2  3
4  5  6
7  8  9
```
The function should return `false` because:
- mat[0][1] !== mat[1][0] (2 !== 4)
- mat[0][2] !== mat[2][0] (3 !== 7)
- mat[1][2] !== mat[2][1] (6 !== 8)

## Tips
- What is the minimal number of elements pairs you would you need to check?