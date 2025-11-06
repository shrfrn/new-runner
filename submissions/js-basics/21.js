'use strict'

console.log('Ex 21')
console.log('Read numbers from the user until 999 is entered')
// reviewed ✔️

// Read numbers from the user, until the number 999 is entered. For each number:
// a. Print if it’s divided by 3.
// b. Print whether this number is much bigger (more than 10) than the previous number.

var currNum = +prompt('Please enter a number (enter 999 to exit)')
var prevNum = currNum

while (currNum !== 999) {
  if (currNum % 3 === 0) {
    console.log(currNum, 'is divided by 3')
  } else {
    console.log(currNum, 'is not divided by 3')
  }
  if (currNum > prevNum + 10) {
    console.log(currNum, 'is much bigger than', prevNum)
  }
  prevNum = currNum
  currNum = +prompt('Please enter a number (enter 999 to exit)')
}
