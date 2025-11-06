# Exercise 13: The Elevator

## Instructions
In this exercise, you will create a simple elevator simulator that:
1. Initializes a variable named `currFloor` to 0 (ground floor)
2. Asks the user which floor they would like to go to
3. Checks that the requested floor is within valid range (-2 to 4)
4. Updates the `currFloor` variable and informs the user of their current floor
5. Displays special messages for certain floors:
   - If user goes to floor 0 (exit): "Bye bye"
   - If user goes to a negative floor (parking): "Drive safely"

## Example
If the user enters:
- Destination floor: 3

Expected output:
```
You are now on floor 3
```

If the user enters:
- Destination floor: 0

Expected output:
```
You are now on floor 0
Bye bye
```

If the user enters:
- Destination floor: -1

Expected output:
```
You are now on floor -1
Drive safely
```

If the user enters:
- Destination floor: 6 (out of range)

Expected output:
```
Invalid floor. Please select a floor between -2 and 4.
```

## Tips
- Remember to convert the user input to a number