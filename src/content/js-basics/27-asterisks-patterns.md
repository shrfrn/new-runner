# Exercise 27: Asterisks Patterns

## Instructions
In this exercise, you will implement several functions that create patterns using asterisks:

### Part I: Basic Asterisks
1. Implement the function `getAsterisks(length)` which returns a string of asterisks
2. The number of asterisks in the string is determined by the length parameter
3. For example: when length is 4, it returns '****'

### Part II: Triangle Pattern
1. Implement the function `getTriangle(height)` which returns a triangle pattern
2. The height parameter determines the size of the triangle
3. For example, `getTriangle(4)` should return a string that looks like this when printed:
```
*
**
***
****
***
**
*
```

### Part III: Music Equalizer
1. Implement the function `getMusicEqualizer(rowCount)` which generates asterisks sequences of random lengths between 1 and 10
3. For example, `getMusicEqualizer(5)` might return a string that looks like this when printed:
```
**
******
*****
***
*****
```

### Part IV: Block Patterns
1. Implement the function `getBlock(rows, cols)` which returns a block of asterisks
2. The dimensions are determined by the rows and cols parameters
3. For example, `getBlock(4, 5)` should return a string that looks like this when printed:
```
*****
*****
*****
*****
```

4. Implement the function `getBlockOutline(rows, cols)` which returns only the block outline
5. For example, `getBlockOutline(4, 5)` should return a string that looks like this when printed:
```
*****
*   *
*   *
*****
```

### Part V: Character Support
1. Refactor your code to support any character (not just asterisks)
2. The character should be decided by the user
3. Rename your functions to better describe their new functionality

## Tips
- Use the `getAsterisks` function in a loop for the triangle pattern
- Use the special character `\n` to create new lines in your output strings
- Test each function with various input parameters 