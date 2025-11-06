'use strict'

console.log('Ex 20')
console.log('Read 10 numbers from the user and print: max, min, avg')
// reviewed ✔️

// Read 10 numbers from the user and print:
// a. The maximum number.
// b. The minimum number.
// c. The average.

var maxNum = -Infinity
var minNum = Infinity

var sum = 0
var count = 0
while (count < 10) {
  var num = +prompt('Enter a number')
  if (num > maxNum) {
    maxNum = num
  }

  if (num < minNum) {
    minNum = num
  }

  sum += num
  count++
}

console.log('maxNum: ', maxNum)
console.log('minNum: ', minNum)
console.log('avg: ', sum / count)
