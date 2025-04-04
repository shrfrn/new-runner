# Exercise 46: Array Multiplication

## Instructions
In this exercise, you will:
1. Write a function named `multBy(nums, multiplier)` which modifies the nums array so that each of its items is multiplied by the multiplier
2. The function should return the modified array
3. Add another parameter named `isImmutable` to the function
4. When `isImmutable` is true, use `array.slice()` to perform the calculation on a copy of the array, leaving the original array unchanged
5. In both cases, the function should return the array of multiples

## Example
If the function is called with:
- nums: [1, 2, 3, 4, 5]
- multiplier: 2
- isImmutable: false

Expected output:
```
[2, 4, 6, 8, 10]
```

If the function is called with:
- nums: [1, 2, 3, 4, 5]
- multiplier: 2
- isImmutable: true

Expected output:
```
[2, 4, 6, 8, 10]
```
And the original array should remain unchanged: `[1, 2, 3, 4, 5]`

## Tips
- Think about what a function actually recieves when an array is passed to it as a parameter
- Consider how to create a copy of an array