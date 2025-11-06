'use strict'

console.log('Ex 29')
console.log('Operations on number')
// CR needed ✏️

// 29.Read a number from the user (keep it as string such as “24367”) and then:
// var number = prompt('Enter a number')
var numberStr = '1234'

// a. Basic operations:
// i. Print each of its digits in a separate line.
printDigits()

function printDigits() {
  var idx = 0
  while (idx < numberStr.length) {
    console.log(numberStr.charAt(idx))
    idx++
  }
}

// ii. Calculate the sum of its digits.
console.log('INPUT:', numberStr)
console.log('EXPECTED: 10')
console.log('ACTUAL: ', getDigitsSum(numberStr))
console.log('~~~~~~~~~~~~~')

function getDigitsSum(numberStr) {
  var idx = 0
  var sum = 0
  while (idx < numberStr.length) {
    sum += +numberStr.charAt(idx)
    idx++
  }
  return sum
}

// iii. Calculate the multiplication (מכפלה (of its digits
console.log('INPUT:', numberStr)
console.log('EXPECTED: 24')
console.log('ACTUAL: ', getDigitsMult(numberStr))
console.log('~~~~~~~~~~~~~')

function getDigitsMult(numberStr) {
  var idx = 0
  var mult = 1
  while (idx < numberStr.length) {
    mult *= +numberStr.charAt(idx)
    idx++
  }
  return mult
}

// iv. Sum it’s first and last digits.
console.log('INPUT:', numberStr)
console.log('EXPECTED: 5')
console.log('ACTUAL: ', getFirstLastSum(numberStr))
console.log('~~~~~~~~~~~~~')

function getFirstLastSum(numberStr) {
  var lastDigit = +numberStr.charAt(numberStr.length - 1)
  var firstDigit = +numberStr.charAt(0)
  return lastDigit + firstDigit
}

// v. Print it with it’s first and last digits swapped (2731=>1732)
console.log('INPUT:', numberStr)
console.log('EXPECTED: 4231')
console.log('ACTUAL: ')
getFirstLastSwap(numberStr)
console.log('~~~~~~~~~~~~~')

function getFirstLastSwap(numberStr) {
  var str = numberStr.charAt(numberStr.length - 1) + numberStr.substring(1, numberStr.length - 1) + numberStr.charAt(0)
  console.log('Swapped str is', str)
}

// vi. Check whether it’s symmetric (like this number: 95459)
var symmetricNum = '95459'
var unSymmetricNum = '1234'

console.log('INPUT: ', symmetricNum)
console.log('EXPECTED: true')
console.log('ACTUAL: ', isSymmetric(symmetricNum))
console.log('INPUT: ', unSymmetricNum)
console.log('EXPECTED: false')
console.log('ACTUAL: ', isSymmetric(unSymmetricNum))
console.log('~~~~~~~~~~~~~')

function isSymmetric(num) {
  var idx = 0
  while (idx < Math.floor(num.length / 2)) {
    if (num.charAt(idx) !== num.charAt(num.length - idx - 1)) return false
    idx++
  }
  return true
}

// vii. Print the number reversed (BONUS: as a number and not as string).
console.log('INPUT:', numberStr)
console.log('EXPECTED: 4321')
console.log('ACTUAL: ')
printReversedStr(numberStr)
console.log('~~~~~~~~~~~~~')

function printReversedStr(numStr) {
  var idx = numStr.length - 1
  var reveresedStr = ''
  while (idx >= 0) {
    reveresedStr += numStr.charAt(idx--)
  }
  console.log('Reveresed string', reveresedStr)
}

// BONUS:
console.log('INPUT:', numberStr)
console.log('EXPECTED:', 8764321)
console.log('ACTUAL: ')
printReversedNum(numberStr)
console.log('~~~~~~~~~~~~~')

function printReversedNum() {
  var num = 1234678
  var reversedNum = 0
  while (num) {
    reversedNum *= 10
    reversedNum += num % 10
    num = Math.floor(num / 10)
  }
  console.log('Reveresed number', reversedNum)
}

// b. BONUS: Special Numbers
// i. Check if the number is an Armstrong number. I.e 371 is an Armstrong number: 3**3+7**3+1**3 =371. If the number passed the test, print it to the
// console.

console.log('INPUT: ', 153)
console.log('EXPECTED: 153 is an Armstrong number')
console.log('ACTUAL: ')
printArmstrong(153)
console.log('INPUT: ', 154)
console.log('EXPECTED: 154 is NOT an Armstrong number')
console.log('ACTUAL: ')
printArmstrong(154)
console.log('~~~~~~~~~~~~~')

function printArmstrong(num) {
  var numCopy = num
  var sum = 0
  var length = ('' + num).length

  while (numCopy > 0) {
    var digit = numCopy % 10
    sum += digit ** length
    numCopy = parseInt(numCopy / 10)
  }

  if (sum === num) console.log(num + ' is an Armstrong number')
  else console.log(num + ' is NOT an Armstrong number')
}

// ii. Check if the number is a Perfect number. Perfect number is a number that the sum of all its dividers is the number itself. I.e 6 is a perfect number (1+2+3).

console.log('INPUT: ', 6)
console.log('EXPECTED: true')
console.log('ACTUAL: ', isPerfect(6))
console.log('INPUT: ', 7)
console.log('EXPECTED: false')
console.log('ACTUAL: ', isPerfect(7))
console.log('~~~~~~~~~~~~~')

function isPerfect(num) {
  var divider = 1
  var dividersSum = 0

  while (divider <= Math.ceil(num / 2)) {
    if (num % divider === 0) dividersSum += divider
    divider++
  }

  return dividersSum === num
}
// iii. Read a number from the user. Store it in a variable called max. The function should print all the perfect numbers and all the Armstrong numbers that are smaller than max.

// printSpecialNumbers()

function printSpecialNumbers() {
  var max = +prompt('Enter a number')
  for (var i = 0; i < max; i++) {
    if (isArmstrong(i)) console.log('the number ' + i + ' is an Armstrong number')
    if (isPerfect(i)) console.log('the number ' + i + ' is an Perfect number')
  }
}
