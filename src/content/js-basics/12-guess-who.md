# Exercise 12: Guess Who Game

## Instructions
In this exercise, you will create a simple "Guess Who" game that:
1. Uses `alert()` to ask the user to think about an actor
2. Uses `confirm()` to ask two yes/no questions to determine the actor
3. Prints the guessed actor to the console

Follow this decision tree:
- Question 1: "Is the actor a man?"
  - If YES:
    - Question 2: "Is he blonde?"
      - If YES: "Philip Seymour"
      - If NO: "Tom Cruise"
  - If NO:
    - Question 2: "Is she English?"
      - If YES: "Keira Knightley"
      - If NO: "Natalie Portman"

## Example
If the user answers:
1. "Is the actor a man?" → Yes
2. "Is he blonde?" → No

Expected output:
```
Tom Cruise!
```

If the user answers:
1. "Is the actor a man?" → No
2. "Is she English?" → Yes

Expected output:
```
Keira Knightley!
```
