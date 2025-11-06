'use strict'

console.log('EX 31');
console.log('string manipulations');
// CR needed ✏️

// 31. Read a string from the user and print:
// c. Its length.
// d. Its first and last characters.
// e. The string in uppercase and lowercase letters.

var str = prompt('Enter a string')
console.log('Length:', str.length);
console.log('First Character:', str.charAt(0) + 'Last Character:', str.charAt(str.length - 1));
console.log('UpperCase:', str.toUpperCase());
console.log('LowerCase:', str.toLowerCase());