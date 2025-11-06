# Exercise 39: Vote Counter

## Instructions
In this exercise, you will:
1. Implement a function named `countVotes(votes, candidateName)` which counts how many votes a candidate received
2. The function should work with an array of candidate names and a specific candidate to count
3. Test your function with different arrays and candidate names

## Example
If the function is called with:
- votes: ['Nuli', 'Pingi', 'Uza', 'Shabi', 'Uza']
- candidateName: 'Uza'

Expected output:
```
2
```

If the function is called with:
- votes: ['John', 'Jane', 'John', 'John']
- candidateName: 'John'

Expected output:
```
3
```

## Tips
- Think about how to count occurrences in an array
- Consider case sensitivity in name matching
- What should happen if the candidate isn't found?
- Test your function with arrays containing:
  - Multiple votes for the same candidate
  - No votes for the candidate
  - Empty arrays
  - Case variations
- The function should work with any valid array of names and candidate name 