console.log('Ex 07')
console.log('Is the 3rd number is the sum of the first two?');
// reviewed ✔️

// 7. Read 3 numbers from the user and check if the 3rd is the
//  sum of the first two, if so, 
// print all the numbers to the console in this way: 6 + 4 = 10

var num1 = +prompt('First number?')
var num2 = +prompt('Second number?')
var num3 = +prompt('Third number?')

var operator = ' != '

if (num1 + num2 === num3) {
    operator = ' = '
}

console.log(num1 + ' + ' + num2 + operator + num3)