console.log('EX 01')
console.log('Read first name and last name, and welcome the user by his full name.')
// reviewed ✔️

// 1. Read (prompt) a first name and a last name. Declare the variable fullName, and then
// welcome the user by his full name.

var firstName = prompt('Please enter your first name:')
var lastName = prompt('Please enter your last name:')
var fullName = firstName + ' ' + lastName

alert('Welcome ' + fullName)
