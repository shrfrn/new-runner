# Exercise 29: Number Operations

## Instructions
In this exercise, you will read a number from the user (keep it as a string like "24367") and perform various operations on it.

### Part A: Basic Operations
1. Print each digit on a separate line
2. Calculate the sum of its digits
3. Calculate the multiplication of its digits
4. Sum its first and last digits
5. Print the number with first and last digits swapped (e.g., 2731 => 1732)
6. Check if it is symmetric (e.g., 95459)
7. Print the number reversed
8. BONUS: Print the number reversed as a number (not a string)

### Part B: Special Numbers (Bonus)
1. Check if the number is an Armstrong number
   - An Armstrong number is an integer where the sum of each digit raised to the power of the number of digits equals the number itself
   - Example: 371 is an Armstrong number because 3³ + 7³ + 1³ = 371
   - Another example: 548834 is an Armstrong number because 5⁶ + 4⁶ + 8⁶ + 8⁶ + 3⁶ + 4⁶ = 548834
   - If the number passes the test, print it to the console

2. Check if the number is a Perfect number
   - A perfect number is a positive integer equal to the sum of its divisors
   - Example: 6 is a perfect number because 1 + 2 + 3 = 6

3. Read a number from the user and store it in a variable named `max`
   - Implement a function that prints all Perfect numbers and Armstrong numbers smaller than `max`

## Example
If the program is run with:
- Input: "24367"

Expected output for basic operations:
```
2
4
3
6
7
Sum: 22
Multiplication: 1008
First + Last: 9
Swapped: 74362
Is symmetric: false
Reversed: 76342
```

## Tips
- Think about how to access individual digits in a string
- Consider how to convert between strings and numbers when needed
- What should happen with single-digit numbers?
- Test your program with various numbers including:
  - Single digits
  - Multiple digits
  - Symmetric numbers
  - Armstrong numbers
  - Perfect numbers
- The program should work with any valid number string 