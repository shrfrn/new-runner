'use strict'

console.log('Ex 28')
console.log('Find GCD')
// reviewed ✔️

// Write a program that computes the greatest common divisor (GCD) of two positive integers.
// Example: 6, 15 => gcd: 3 Hint: we need something like a loop: i 6 -> 2 and check modulus.

console.log('INPUT: num1: 6, num2: 24')
console.log('EXPECTED: 6')
console.log('ACTUAL: ', findGCD(6, 8))

console.log('\n')

console.log('INPUT: num1: 9, num2: 36')
console.log('EXPECTED: 9')
console.log('ACTUAL: ', findGCD(9, 36))

console.log('\n')

console.log('INPUT: num1: 60, num2: 72')
console.log('EXPECTED: 12')
console.log('ACTUAL: ', findGCD(60, 72))

function findGCD(num1, num2) {
  var divider
  if (num1 < num2) {
    divider = num1
  } else {
    divider = num2
  }

  // short-if
  var divider = num1 < num2 ? num1 : num2

  while (divider) {
    if (num1 % divider === 0 && num2 % divider === 0) return divider
    divider--
  }
}

// var dividerSqrt = Math.sqrt(startingDivider)
// var startingDivider = divider
