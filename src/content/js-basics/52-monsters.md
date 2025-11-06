# Exercise 52: Monsters

## Instructions
In this exercise, you will:
1. Create an array of monsters with 4 monsters using a `createMonsters()` function
2. Each monster object should have:
```js
{ 
    id,     // a unique sequential number
    name,   // read from the user
    power,  // random number between 1-100
}
```

3. Implement the following functions:
   - `createMonsters()`: creates and returns an array of 4 monsters
   - `createMonster(name, power)`: returns a new monster object with optional parameters
   - `getMonsterById(id)`: finds and returns a monster by its id
   - `deleteMonster(id)`: removes a monster from the array
   - `updateMonster(id, newPower)`: updates a monster's power
   - `findMostPowerful(monsters)`: finds the monster with highest power
   - `breedMonsters(monsterId1, monsterId2)`: creates a new monster from two parents. The new monster's power is an average of
its parents powers. Its name is the beginning half of the first parent's name, and
the second half of the second parent's name

## Example
For breeding monsters:
- If parent1 has name "Dragon" and power 80
- And parent2 has name "Phoenix" and power 70
- The child monster should have:
  - name: "Draenix" (first half of Dragon + second half of Phoenix)
  - power: 75 (average of 80 and 70)

## Tips
- Think about how to generate unique sequential IDs
- What should happen when breeding monsters with different name lengths?