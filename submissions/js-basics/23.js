'use strict'

console.log('Ex 23')
console.log('get factorial')
// reviewed ✔️

// Write the function getFactorial that gets a number and returns n! (Google factorial if
// you are not sure what is the mathematical definition of it).

console.log('INPUT: 3')
console.log('EXPECTED: 6')
console.log('ACTUAL: ', getFactorial(3))

console.log('INPUT: 4')
console.log('EXPECTED: 24')
console.log('ACTUAL: ', getFactorial(4))

console.log('INPUT: 4')
console.log('EXPECTED: 24')
console.log('ACTUAL: ', getFactorialFor(4))

function getFactorial(num) {
  var factorial = 1
  while (num > 1) {
    factorial *= num
    num--
  }
  return factorial
}

// function getFactorialFor(num) {
//   var factorial = 1
//   for (var i = num; i > 1; i--) {
//     factorial *= i
//   }
//   return factorial
// }
