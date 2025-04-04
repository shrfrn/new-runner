# Exercise 21: Number Analyzer

## Instructions
In this exercise, you will:
1. Read numbers from the user until the number 999 is entered
2. For each number (except 999), do the following:
   - Check if it is divisible by 3
   - Check if it is larger by more than 10 from the previous number

## Example
Here's how your program might work:

If the user enters: 9, 25, 14, 30, 999

Your program would output:
```
9 is divisible by 3

25 is not divisible by 3
25 is larger by more than 10 from previous number (9)

14 is not divisible by 3

30 is divisible by 3
30 is larger by more than 10 from previous number (14)
```

## Tips
- Remember to convert user inputs to numbers
- Use a sentinel value (999) to determine when to stop the loop
- Keep track of the previous number to compare with the current input
- Be careful with the first number, as there is no previous number to compare with
- Test your program with various inputs, including numbers that are and aren't divisible by 3 