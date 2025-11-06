# Exercise 16: Even Number Checker

## Instructions
In this exercise, you will:
1. Write a function named `isEven` that receives a number as a parameter
2. The function should return `true` if the number is even, and `false` if it is odd
3. Test your function with different numbers

## Function Specification
Create a function with these characteristics:
- Function name: `isEven`
- Parameters: One parameter - `number`
- Return value: Boolean (`true` or `false`)

## Example
Here's how this function may be used:

```javascript
console.log(isEven(4))   // Output: true
console.log(isEven(7))   // Output: false
console.log(isEven(0))   // Output: true
console.log(isEven(-2))  // Output: true
```

## Tips
- A number is even if it is divisible by 2 (i.e., the remainder when divided by 2 is 0)
- Use the modulo operator (%) to find the remainder after division
- Make sure your function works correctly with zero and negative numbers
- The function name `isEven` follows a common naming convention for functions that return a boolean value (starting with "is" or "has") 