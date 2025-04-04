# Exercise 10: Facebook Friends Analyzer

## Instructions
In this exercise, you will:
1. Use `prompt()` to ask the user how many Facebook friends they have
2. Analyze the number and display an appropriate message based on these rules:
   - More than 500 friends: "OMG, a celebrity!"
   - Between 301 and 500 friends: "You are well connected!"
   - Between 101 and 300 friends: "You know some people..."
   - Less than 100 friends: "Quite picky, aren't you?"
   - 0 friends: "Let's be friends!"

## Example
If the user enters:
- Number of friends: 350

Expected output:
```
You are well connected!
```

If the user enters:
- Number of friends: 50

Expected output:
```
Quite picky, aren't you?
```

## Tips
- Remember to convert the user input to a number
- Think about how to check if a value falls within a certain range
- Consider what happens at the boundaries of each range (like exactly 100 or 500 friends)
- Test your program with different values from each category 