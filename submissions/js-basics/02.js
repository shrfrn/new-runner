console.log('EX 02')
console.log('Read 2 numbers from the user and print the following operations (%,/,*) on them.')
// reviewed ✔️

// 2. Read two numbers and print (to the console) the result of the following operations on
// them:
// (% ,/ ,*)

var num1 = +prompt('Please enter a number: ')
var num2 = +prompt('Please enter another number: ')

var moduloRes = num1 % num2
console.log(num1 + ' % ' + num2 + ' = ' + moduloRes)

var divisionRes = num1 / num2
console.log(num1 + ' / ' + num2 + ' = ' + divisionRes)

var multRes = num1 * num2
console.log(num1 + ' * ' + num2 + ' = ' + multRes)
