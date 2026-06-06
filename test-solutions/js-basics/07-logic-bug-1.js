console.log('EX 07')
console.log('Sum Checker')

var num1 = prompt('Enter first number:')  // Not converted to number
var num2 = prompt('Enter second number:')
var num3 = prompt('Enter third number:')

if (num1 + num2 === num3) {  // String concatenation vs number addition
  console.log(num1 + ' + ' + num2 + ' = ' + num3)
} else {
  console.log(num1 + ' + ' + num2 + ' != ' + num3)
}



