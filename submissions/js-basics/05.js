console.log('Ex 05')
console.log('Print the number');
// reviewed ✔️

//5. Read 3 digits from the user and print the number in full: for example: if the user entered the numbers 3,2,6, we should store them in a variable holding the value of 326 and then print that variable to the console.
//● BONUS: In this case, working with strings is easier, try solving the task while using numeric variables.

var strDigit1 = prompt('Enter first digit')
var strDigit2 = prompt('Enter second digit')
var strDigit3 = prompt('Enter third digit')

var strNum = strDigit1 + strDigit2 + strDigit3
console.log('The full number is: ' + strNum)

//BONUS:
var digit1 = +prompt('Enter first digit')
var digit2 = +prompt('Enter second digit')
var digit3 = +prompt('Enter third digit')

var num = digit1 * 100 + digit2 * 10 + digit3
console.log('The full number is: ' + num)