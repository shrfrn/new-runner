# Exercise 44: Number Counter

## Instructions
In this exercise, you will:
1. Write a function named `printNumsCount(nums)` which counts occurrences of numbers in an array
2. The input array contains integers in the range 0-3
3. The function should print how many times each number appears in the input array

## Example
If the function is called with:
- Input: [3, 2, 0, 2, 2, 0, 3]

Expected output:
```
[2, 0, 3, 2]
```

## Tips
- The fact that the values of the input array are in a specific range allows us to use a second array, in which each item, is a counter
- The values of this second array, will store the occurrences of the numbers in the input array. 
- Consider how to handle numbers that don't appear in the input
- What should happen with empty arrays?
- Test your function with various inputs including:
  - Arrays with all numbers present
  - Arrays with missing numbers
  - Arrays with repeated numbers
  - Empty arrays