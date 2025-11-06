# Exercise 60: Game of Life

## Instructions
In this exercise, you will:
1. Implement Conway's Game of Life simulation
2. The colony is described by a matrix where each cell is either:
   - Populated by a creature (marked by '*')
   - Vacant (empty)
3. Each cell can have up to 8 neighboring cells

4. Implement the following rules:
   - If a creature has 0-2 neighbors: it dies of loneliness
   - If a cell has 3-5 neighbors: it gets a creature (newborn or existing)
   - If a creature has 6-8 neighbors: it dies of suffocation

5. Use `setInterval` to run the simulation:
```javascript
function play() {
  gBoard = runGeneration(gBoard)
  renderBoard(gBoard)
}
```

## Example
Initial state:
```
*   *   *
  * *   
*       
  *     
    * * 
```

After one generation:
```
*   *   *
  * *   
*   *   
  * *   
    * * 
```

## Tips
- Think about how to count neighbors efficiently
- What should happen at matrix boundaries?
- Consider using a second matrix for the next generation