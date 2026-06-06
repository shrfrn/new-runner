console.log('EX 09')
console.log('Difference Checker')

var num1 = +prompt('Enter first positive number:')
var num2 = +prompt('Enter second positive number:')
var difference = num1 - num2  // Missing Math.abs

console.log('Number 1: ' + num1 + ', Number 2: ' + num2 + ', Difference: ' + difference)

if (difference < num1 && difference < num2) {
  console.log('The numbers are relatively close!')
}



