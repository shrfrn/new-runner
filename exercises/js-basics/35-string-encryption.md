# Exercise 35: String Encryption

## Instructions
In this exercise, you will implement encryption and decryption functions for strings.

### Part I: Basic Encryption
1. Implement the function `encrypt(str)` which receives a string
2. The function should encrypt the string by replacing each character's code with code + 5
3. For example: 'r' will be replaced by 'w'

### Part II: Decryption
1. Implement the function `decrypt(str)` which receives an encrypted string
2. The function should decrypt the string by replacing each character's code with code - 5
3. The function should work with strings previously encrypted by the `encrypt` function

### Part III: Bonus
1. Extract the common logic to an `encode` function
2. The `encode` function should handle both encryption and decryption
3. Use this function in both `encrypt` and `decrypt`

## Example
If the program is run with:
- Input: "ABC"

Expected output for encryption:
```
FGH
```

If the program is run with:
- Input: "FGH"

Expected output for decryption:
```
ABC
```

## Tips
- Try running this in the console: `'ABC'.charCodeAt(0)`
- Search for the opposite function of `charCodeAt()`