# Exercise 23: Factorial Function

## Instructions
In this exercise, you will:
1. Create a function named `getFactorial` that calculates the factorial of a number
2. The function takes one parameter: `n` (a non-negative integer)
3. The function should return *n!* (n factorial)

## What is Factorial?
The factorial of a non-negative integer *n*, denoted by *n!*, is the product of all positive integers less than or equal to *n*.

For example:
- 5! = 5 × 4 × 3 × 2 × 1 = 120
- 3! = 3 × 2 × 1 = 6
- 1! = 1
- 0! = 1 (by definition)

## Function Specification
Create a function with these characteristics:
- Function name: `getFactorial`
- Parameters: One parameter - `n` (a non-negative integer)
- Return value: The factorial of *n*

## Test Cases
Test your function with these inputs:
1. *n = 0* (expected result: 1)
2. *n = 1* (expected result: 1)
3. *n = 4* (expected result: 24)
4. *n = 6* (expected result: 720)

## Tips
- Remember that 0! is defined as 1
- Think about how to use loops to multiply a number by itself several times
- Be careful with large numbers, as factorials grow very quickly
- This function should only work with non-negative integers
