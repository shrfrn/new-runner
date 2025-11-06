'use strict'

console.log('Ex 26')
console.log('get 10 random numbers')
// reviewed ✔️

// Write a program that generates 10 random numbers. The numbers should be
// generated so each number is greater than the previously generated number.
// To simplify, generate the first number n so it is between (0→1000), and each
// subsequent number will be in the range of ( n+1 → n+1001).
// example:
// First random number: (0→1000) 100
// Second random number: (101→1101) 748
// Third random number: (749→1749) 1650…

console.log('ACTUAL:')
getRandomNumbers()

function getRandomNumbers() {
  var min = 0
  var count = 0
  while (count < 10) {
    var randomInt = getRandomInteger(min, min + 1000)
    console.log(randomInt)
    min = randomInt + 1
    count++
  }

  // for (var i = 0; i < 10; i++) {
  //     var randomInt = getRandomInteger(minVal, minVal + 1000)
  //     console.log(randomInt);
  //     minVal = randomInt + 1
  // }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
