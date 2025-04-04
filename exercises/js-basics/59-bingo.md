# Exercise 59: Bingo Game

## Instructions

In this exercise, you will:

1. Implement a Bingo game with multiple players
1. Each player has a 5 x 5 game board with unique random numbers between 1 - 99
1. On each turn, a random number between 1 - 99 is drawn. If it appears in a player's board, it is marked.
1. The first player to mark all cells in his board wins the game.

We will implement the game in small steps, adding more compexity each time.

1. Create the following data structure:

```javascript
var gPlayers = [
	{ name: 'Muki', hitCount: 0, board: createBingoBoard() },
	{ name: 'Puki', hitCount: 0, board: createBingoBoard() },
]
```

1. Each cell in the board should hold an object:

```javascript
{ value: 17, isHit: false }
```

1. Implement the following functions:

    - `createBingoBoard()`: returns a 5x5 matrix with numbers 1-25 (We will change this later to 1-99)
    - `printBingoBoard(board)`: uses `console.table()` to print the board showing the numbers in each cell. Add a `v` next to a number if it has been hit. Check your function by manually setting a cell's `isHit` to `true` like this: `gPlayers[0].board[0][0].isHit = true` and printing the board (remember you can run code from the console).
    - Implement some placeholder functions:
        - `drawNum()`: returns a random number (initially fixed, then 1-99)
        - `markBoard()`: marks matching numbers on players' boards and updates the user's `hitCount`
        - `checkBingo()`: checks if a player has won (returns `true` for now)
        - Use the following `playBingo()` function to run the main game loop

    ```javascript
    function playBingo() {
    	var isVictory = false

    	while (!isVictory) {
    		var calledNum = drawNum()

    		for (var i = 0; i < gPlayers.length && !isVictory; i++) {
    			var player = gPlayers[i]
    			markBoard(player, calledNum)
    			isVictory = checkBingo(player)
    		}
    	}
    }
    ```

1. Update the checkBingo function to check if the player’s `hitCount` has reached 25.
1. Update `drawNum()` to use a global array - `gNums` with the numbers 1 - 99 and randomely select a number, splice it out of the array and return it
1. Add a `resetNums()` function which resets the `gNums` array. Use it at the begining of `createBingoBoard()` and also at the begining of `playBingo()`

1. Add features:
    - Check for completed rows and diagonals
    - Use `setInterval` for game turns
    - Don't forget to `clearInterval(gameInterval)` when the game is over
    
How complicated would it be to support adding more players
How complicated would it be to support 6x6 boards

## Example

Initial board:

```
1  2  3  4  5
6  7  8  9  10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25
```

After some hits:

```
1  2v 3  4  5
6  7  8v 9  10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25
```