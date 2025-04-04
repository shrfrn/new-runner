# Exercise 47: String Split Implementation

## Instructions
In this exercise, you will:
1. Implement your own version of the split function - `mySplit(str, sep)`
2. The function should work with different types of strings and separators
3. You can assume that the separator (delimiter) is a single character
4. Test the function with various inputs like:
   - 'Japan,Russia,Sweden'
   - '1-800-652-0198'

## Example
If the function is called with:
- str: 'Japan,Russia,Sweden'
- sep: ','

Expected output:
```
['Japan', 'Russia', 'Sweden']
```

If the function is called with:
- str: '1-800-652-0198'
- sep: '-'

Expected output:
```
['1', '800', '652', '0198']
```

## Bonus
Extend the function to handle multi-character separators, for example:
- str: 'A|||B|||C'
- sep: '|||'

Expected output:
```
['A', 'B', 'C']
```

## Tips
- Think about how to find separator positions in the string
- Consider how to extract substrings between separators
- What should happen with empty strings or strings without separators?
- Test your function with various inputs including:
  - Strings with single-character separators
  - Strings with multi-character separators (bonus)
  - Strings with no separators
  - Empty strings