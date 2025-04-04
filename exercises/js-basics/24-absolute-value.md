# Exercise 24: Absolute Value Function

## Instructions
In this exercise, you will:
1. Explore the built-in `Math.abs()` function to understand how it works
2. Create your own function named `myAbs()` that mimics the behavior of `Math.abs()`
3. Test your function with various inputs to ensure it works correctly
4. Do not use the built in `Math.abs()` function. Implement your ownsolution.

## What is Absolute Value?
The absolute value of a number is its distance from zero on the number line, regardless of direction. In other words, it's the positive version of any number. In mathematical notation, the absolute value of *n* is written *|n|*

For example:
- |5| = 5
- |-5| = 5
- |0| = 0

## Function Specification
Create a function with these characteristics:
- Function name: `myAbs`
- Parameters: One parameter - `num` (any number)
- Return value: The absolute value of the number

## Test Cases
Test your function with these inputs:
1. Positive number: 10 (expected result: 10)
2. Negative number: -10 (expected result: 10)
3. Zero: 0 (expected result: 0)
4. Decimal positive: 3.14 (expected result: 3.14)
5. Decimal negative: -3.14 (expected result: 3.14)

## Tips
- Think about what happens when you multiply a negative number by -1
- The absolute value is always greater than or equal to zero
- Your function should work with all numeric inputs (integers and decimals)
- Consider using conditional logic to handle negative versus positive numbers 