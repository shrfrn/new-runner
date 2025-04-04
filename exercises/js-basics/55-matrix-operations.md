# Exercise 55: Matrix Operations

## Instructions
In this exercise, you will:
1. Fill up a matrix with numbers
2. Implement the following functions:
   - `sumCol(mat, colIdx)`: sums all numbers in a specific column
   - `sumRow(mat, rowIdx)`: sums all numbers in a specific row
   - `findMax(mat, colIdx)`: finds the maximum number in a specific column
   - `findAvg(mat)`: calculates the average of all numbers in the matrix
   - `sumArea(mat, rowIdxStart, rowIdxEnd, colIdxStart, colIdxEnd)`: sums numbers in a specific area of the matrix

## Example
For a matrix:
```
1  2  3
4  5  6
7  8  9
```

- `sumCol(mat, 1)` should return 15 (2 + 5 + 8)
- `sumRow(mat, 1)` should return 15 (4 + 5 + 6)
- `findMax(mat, 1)` should return 8
- `findAvg(mat)` should return 5
- `sumArea(mat, 0, 1, 0, 1)` should return 12 (1 + 2 + 4 + 5)