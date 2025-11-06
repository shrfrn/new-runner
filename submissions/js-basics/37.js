'use strict'

console.log('EX 37')
console.log('that generates a password of a specified length. The password is made out of random digits and letters');
// CR needed ✏️

// Write a function named generatePass(passLength) that generates a password of a specified length. The password is made out of random digits and letters.

console.log(generatePass(5))

function generatePass(passLength) {
  var charStr = 'absdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  var password = ''
  for (var i = 0; i < passLength; i++) {
    var randomIdx = getRandomInteger(0, charStr.length)
    password += charStr.charAt(randomIdx)
  }
  return password
}

// Another option:
// var str = '';
// for (var i = 0; i < passLength; i++) {
//     str += String.fromCharCode(97 + Math.floor(Math.random() * 26)); //just lowercase
// }
// return str


function getRandomInteger(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}