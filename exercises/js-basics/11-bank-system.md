# Exercise 11: Simple Bank System

## Instructions
In this exercise, you will create a simple banking system that:
1. Initializes a variable named `currBalance` with the value 1000
2. Initializes a constant named `PIN` with the value '0796'
3. Prompts the user to enter a PIN code
4. If the PIN is correct:
   - Asks the user how much they would like to withdraw
   - Updates the balance and displays it
5. If the PIN is incorrect:
   - Alerts the user with an error message
   - Does not allow a withdrawal
6. Add a feature to prevent withdrawals which exceed the current balance

## Example
If the user enters:
- PIN: '0796' (correct)
- Withdrawal amount: 300

Expected output:
```
Withdrawal successful. Your new balance is: 700
```

If the user enters:
- PIN: '1234' (incorrect)

Expected output:
```
Incorrect PIN. Access denied.
```

If the user enters:
- PIN: '0796' (correct)
- Withdrawal amount: 1500 (exceeds balance)

Expected output:
```
Sorry, your balance is insufficient. Your current balance is: 1000
```

## Tips
- Test your program with various combinations of inputs
- Make sure the balance is updated correctly after successful withdrawals 