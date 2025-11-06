'use strict'

console.log('Ex 27')
console.log('print Asterisks')
// reviewed ✔️

// a. Write the function getAsterisks(length) that returns a string containing asterisks according to the number supplied. For example: when the requested length is 4, it returns '****'
// b. Write a function named: getTriangle(height) that returns a triangle:
// c. Write a function named: getMusicEqualizer(rowsCount) that generates random numbers between 1 and 10 and return columns in random lengths:
// d. Write a function that returns a block of asterisks (*) by the following parameters: rowsCount and colsCount. I.e: for 4, 5
// e. Surprise, there is a new requirement to support any character (not necessarily asterisk), how easy would it be to refactor your code? The character should be decided by the user

// Printing patterns of Asterisks.
// const CHAR = prompt('What char you want?')
const CHAR = '*'

// a.
console.log('print string that contains the given char:')
console.log(getSymbol(4, CHAR))
console.log('====================')

// b.
console.log('print triangle:')
console.log(getTriangle(5, CHAR))
console.log('====================')

// c.
console.log('print equalizer:')
console.log(getMusicEqualizer(4, CHAR))
console.log('====================')

// d.
console.log('print block:')
console.log(patternBlock(4, 5, CHAR))
console.log('====================')

// e.
console.log('print block outlined:')
console.log(getPatternOutline(5, 4, CHAR))

function getSymbol(length, char) {
  var count = 0
  var str = ''
  while (count < length) {
    str += char // '*'
    count++
  }
  return str

  // Another option:
  // return char.repeat(length)
}

function getTriangle(height, char) {
  if (height === 1) return char
  var count = 1
  var triangle = ''
  while (count < height) {
    triangle += getSymbol(count, char) + '\n'
    count++
  }
  while (count > 0) {
    triangle += getSymbol(count, char) + '\n'
    count--
  }
  return triangle
}

function getMusicEqualizer(rowsCount, char) {
  var count = 0
  var equalizer = ''
  while (count < rowsCount) {
    var randomNum = getRandomInteger(1, 10)
    equalizer += getSymbol(randomNum, char) + '\n'
    count++
  }
  return equalizer
}

function patternBlock(rows, cols, char) {
  var count = 0
  var str = ''
  while (count < rows) {
    str += getSymbol(cols, char) + '\n'
    count++
  }
  return str
}

function getPatternOutline(rows, cols, char) {
  var count = 0
  var str = ''
  while (count < rows) {
    if (count === 0 || count === rows - 1) {
      str += getSymbol(cols, char) + '\r'
    } else {
      str += _getEmptyLine(cols, char) + '\r'
    }
    count++
  }
  return str
}

function _getEmptyLine(length, char) {
  var str = char
  var count = length - 2
  while (count > 0) {
    str += ' '
    count--
  }
  str += char
  return str
}

function getRandomInteger(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}
