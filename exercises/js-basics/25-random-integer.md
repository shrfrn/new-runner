# Exercise 25: Random Integer Generator

## Instructions
In this exercise, you will:
1. Implement a function named `getRandomInt(min, max)` that generates a random integer
2. The function should generate numbers in the range from `min` to `max - 1` (inclusive of min, exclusive of max)
3. Test your function to ensure it generates numbers in the correct range

## Function Specification
Create a function with these characteristics:
- Function name: `getRandomInt`
- Parameters: Two parameters - `min` and `max` (both integers)
- Return value: A random integer between min (inclusive) and max (exclusive)

## Test Cases
Test your function with these inputs:
1. min = 1, max = 11 (should generate numbers from 1 to 10)
2. min = 5, max = 16 (should generate numbers from 5 to 15)
3. min = 0, max = 101 (should generate numbers from 0 to 100)

## Tips
- Think about how to use `Math.random()` to generate numbers in a specific range
- Consider how to ensure the output is always an integer
- What happens if min is greater than or equal to max?
