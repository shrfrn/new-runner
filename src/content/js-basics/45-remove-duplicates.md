# Exercise 45: Remove Duplicates

## Instructions
In this exercise, you will:
1. Write a function named `removeDuplicates(nums)` which removes duplicate numbers from an array
2. The input array contains integers in the range 0-5
3. The function should return a new array with duplicates removed
4. The order of elements in the output array should match their first occurrence in the input array

## Example
If the function is called with:
- Input: [5, 4, 5, 2, 1, 2, 4]

Expected output:
```
[5, 4, 2, 1]
```

## Tips
- The fact that the values of the input array are in a specific range allows us to use a second array, in which each item, is a boolean flag
- The values in this second array, will store wheather the corresponding value from the input array, has already been encountered
