'use strict'

console.log('EX 34')
console.log('My Index Of')
// reviewed ✔️

// 34.+UnitTesting write a function named myIndexOf(str, searchStr) that accepts 2 strings.
// The function returns the index of the second string in the first, if it wasn’t found, return
// -1 (don’t use the built-in indexOf...).

console.log('INPUT: abbcd,bc')
console.log('EXPECTED: 2')
console.log('ACTUAL: ', myIndexOf1('abbcd', 'bc'))

console.log('INPUT: hello index, idx')
console.log('EXPECTED: -1')
console.log('ACTUAL: ', myIndexOf('hello index', 'idx'))

function myIndexOf(str, searchStr) {
  for (var i = 0; i <= str.length - searchStr.length; i++) {
    if (str.substring(i, i + searchStr.length) === searchStr) {
      return i
    }
  }
  return -1
}



// without substring:
function myIndexOf1(str, searchStr) {
  var currLength = 0
  var index = 0
  for (var i = 0; i < str.length; i++) {
    while (str.charAt(i + index) === searchStr.charAt(index)) {
      currLength++
      if (currLength === searchStr.length) return i
      index++
    }
    currLength = 0
    index = 0
  }
  return -1
}
