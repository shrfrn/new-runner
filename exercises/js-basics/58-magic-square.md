# Exercise 58: Magic Square

## Instructions
In this exercise, you will:
1. Implement the function `isMagicSquare(mat)` which checks if a matrix is a magic square
2. A matrix is a magic square if:
   - It is a square matrix (same number of rows and columns)
   - The sums of all rows are equal
   - The sums of all columns are equal
   - The sums of both diagonals are equal
   - All these sums should be equal to each other

## Example
For a magic square:
```
2  7  6
9  5  1
4  3  8
```
The function should return `true` because:
- All rows sum to 15: (2+7+6), (9+5+1), (4+3+8)
- All columns sum to 15: (2+9+4), (7+5+3), (6+1+8)
- Both diagonals sum to 15: (2+5+8), (6+5+4)

For a non-magic square:
```
1  2  3
4  5  6
7  8  9
```
The function should return `false` because:
- Row sums are different: 6, 15, 24
- Column sums are different: 12, 15, 18
- Diagonal sums are different: 15, 15

## Tips
- Think about how to check if the matrix is square
- Consider how to calculate row, column, and diagonal sums