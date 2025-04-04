# Exercise 40: Lorem Ipsum Generator

## Instructions
In this exercise, you will implement a function that generates random dummy text (Lorem Ipsum).

### Part I: Word Generation
1. Write a function named `getWord()` which returns a single word
1. Each word should be 3-5 random letters long
1. The length of each word should be generated randomly

### Part II: Sentence Generation
1. Implement the function `getLoremIpsum(wordsCount)` which returns a sentence
2. The sentence should contain the specified number of words
3. Each word should be generated using the `getWord()` function
4. Words should be separated by spaces

## Example
If the function is called with:
- Input: 5

Expected output might be:
```
kexa mop qwerty zuiop asdf
```

## Tips
- Think about how to generate random letters
- Consider how to create words of varying lengths