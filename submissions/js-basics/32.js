'use strict'

console.log('EX 32');
console.log('reversing a string');
// CR needed ✏️

// 32. Read a string from the user and print it backwards using a loop.

var str = prompt('Enter a string')
var reversedStr = ''

for (var i = str.length - 1; i >= 0; i--) {
    reversedStr += str.charAt(i)
}
console.log('The backward str is:', reversedStr);
