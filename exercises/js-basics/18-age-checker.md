# Exercise 18: Age Verification

## Instructions
In this exercise, you will:
1. Write a function named `isAbove18` that receives a name and an age as parameters
2. The function should check if the person is above 18 years old
3. Display an appropriate message using `alert()` based on the age
4. Return a boolean value indicating if the person is above 18

## Function Specification
Create a function with these characteristics:
- Function name: `isAbove18`
- Parameters: Two parameters - `name` and `age`
- Return value: Boolean (`true` if age > 18, `false` otherwise)
- Side effects: The function should display an alert message

## Example
If the function is called with:
- name = "David", age = 20

Expected output:
```
Alert: "David, You're allowed"
Return value: true
```

If the function is called with:
- name = "Sarah", age = 16

Expected output:
```
Alert: "You are too young"
Return value: false
```

## Tips
- Remember that the function needs to both display an alert AND return a boolean
- Test your function with various combinations of names and ages 