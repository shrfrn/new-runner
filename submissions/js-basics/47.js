'use strict'

// console.log('Ex 47')
// console.log('My Split')
// reviewed ✔️

// 47.Implement your own version of the split function: mySplit(str, sep) Test it with different
// types of strings and separators. I.e ‘Japan,Russia,Sweden'
// You can assume that the separator (delimiter) is a single character. (BONUS: don’t assume that)

var strings = 'Japan,Russia,Sweden,USA,Israel'
var seperator = ','
var splitted = mySplit(strings, seperator)
// console.log(splitted)

strings = 'Japan|||Ru👑ssia|||Swe👑den|||US👑A|||👑Israel'
seperator = '|||'
splitted = mySplit(strings, seperator)
// console.log(splitted)

// Option (without bonus):
function mySplit(str, sep) {
  var words = []
  var startIdx = 0
  str += sep
  for (var i = 0; i < str.length; i++) {
    var currChar = str.charAt(i)
    if (currChar === sep) {
      var word = str.substring(startIdx, i)
      words.push(word)
      startIdx = i + 1
    }
  }
  return words
}

// Option (without bonus) using indexOf and substring
function mySplit(str, sep) {
  var strs = []
  str += sep
  for (var i = 0; i < str.length; i++) {
    var sepIdx = str.indexOf(sep)
    var word = str.substring(0, sepIdx)
    strs.push(word)
    str = str.substring(sepIdx + sep.length)
  }
  return strs
}

// Option (without bonus) using if else inside for loop:
// function mySplit(str, sep) {
//   var strs = []

//   var word = ''
//   for (var i = 0; i < str.length; i++) {
//     if (str[i] !== sep && i !== str.length - 1) {
//       word += str[i]
//     } else {
//       strs.push(word)
//       word = ''
//       console.log(str.indexOf(sep));
//     }
//   }
//   console.log('strs', strs);
//   return strs
// }

// Option (with bonus) using the indexOf with 2 parameters
// (second is where to start searching):
// function mySplit(str, sep) {
//   var strs = [];
//   var nextIdx;
//   for (var i = 0; i < str.length; i = nextIdx + sep.length) {
//     nextIdx = str.indexOf(sep, i);
//     if (nextIdx === -1) {
//       nextIdx = str.length;
//     }
//     var word = str.substring(i, nextIdx)
//     strs.push(word);
//   }
//   return strs;
// }

// Option (with bonus) using if else inside for loop:
// function mySplit(str, sep) {
//     str += sep
//     var word = ''
//     var strs = []
//     for (var i = 0; i < str.length; i++) {
//         if (str.substr(i, sep.length) === sep) {
//             i += sep.length - 1
//             strs.push(word)
//             word = ''
//         } else {
//             word += str.charAt(i)
//         }
//     }
//     return strs
// }

// :Sharon

'use strict'

/*
// exercise 47 - mySplit()
// 
// Implement your own version of the built-in javaScript split function - mySplit(str, sep).
// 
// Test it with different types of strings and separators:
// 
// You can try – 'Japan,Russia,Sweden' or '1-800-652-0198'
// 
// You can assume that the separator (delimiter) is a single character.
// 
// BONUS: don’t assume that, e.g: 'A|||B|||C'
*/


var str = 'Japan,,,Russia,,,Sweden'
var sep = ',,,'
var res = mySplit(str, sep)

console.log('INPUT:', str)
console.log('EXPECTED:', '[Japan', ',', 'Russia', ',', 'Sweden]')
console.log('ACTUAL:', res)

function mySplit(str, sep) {
    var words = []
    var word = str
    
    str += sep

    for (var i = 0; i < str.length - sep.length; i = idx + sep.length) {

        var idx = str.indexOf(sep, i)
        // if(idx === -1) break
        
        word = str.substring(i, idx)
        words.push(word)
    } 

    return words.length === 0 ? [str] : words
}