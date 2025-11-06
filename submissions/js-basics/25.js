'use strict'

console.log('Ex 25')
console.log('my random integer')
// reviewed ✔️

// Write A function named getRandomInteger(min, max). The function should generate
// a random integer between the min and max parameters.
// Hint: Use Math.Random & Math.Floor.
// a. After you've played with it enough, read this page. Look at the getRandomInt
// function.
// b. Yes, it's better, now remember you can always use it later on in the course.
// (how amazing is that?)

console.log('INPUT: 5, 7')
console.log('EXPECTED: random int btween 5 - 7')
console.log('ACTUAL: ', getRandomInteger(5, 7))

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
