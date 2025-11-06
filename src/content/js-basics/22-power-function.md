# Exercise 22: Power Function

## Instructions
In this exercise, you will:
1. Create a function named `myPow` that calculates powers of numbers
2. The function takes two parameters:
   - `base`: The number to be raised to a power
   - `exponent`: The power to raise the base to
3. The function should return the result of base^exponent
4. Do not use the built in `Math.pow()` function! Implement your own solution using a loop.

## Function Specification
Create a function with these characteristics:
- Function name: `myPow`
- Parameters: Two parameters - `base` and `exponent` (both numbers)
- Return value: The result of base raised to the power of exponent

## Test Cases
Test your function with these inputs:
1. base = 2, exponent = 3 (expected result: 8)
2. base = 5, exponent = 2 (expected result: 25)
3. base = 3, exponent = 4 (expected result: 81)
4. base = 10, exponent = 0 (expected result: 1)
5. base = 1, exponent = 10 (expected result: 1)

## Tips
- Think about how to multiply a number by itself multiple times
- Consider special cases:
  - What happens when the exponent is 0?
  - What happens when the base is 0?
  - What happens when the base is 1?
- Test your function with different combinations of inputs
