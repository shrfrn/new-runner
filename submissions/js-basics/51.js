'use strict'

console.log('Ex 51')
console.log('Find apperances in text')
// CR needed ✏️

// +UnitTesting Object as a Map: Write the function countWordApperances(txt) that returns an object map. This object will have a key that will be the word. The value will be the count (how many times this word appeared in the string).
// example: countWordApperances('puki ben david and muki ben david') will return: { puki: 1, ben: 2, david: 2, and: 1, muki: 1 }

var str = 'puki ben david and muki ben david'
console.log('INPUT: puki ben david and muki ben david')
console.log('EXPECTED:', { puki: 1, ben: 2, david: 2, and: 1, muki: 1 })
console.log('ACTUAL: ', countWordApperances(str))

function countWordApperances(txt) {
  var words = txt.split(' ')
  var wordCountMap = {}

  for (var i = 0; i < words.length; i++) {
    var currWord = words[i]
    if (!wordCountMap[currWord]) {
      wordCountMap[currWord] = 0
    }
    wordCountMap[currWord]++

    // // short-if
    // wordCountMap[currWord] = (wordCountMap[currWord]) ? wordCountMap[currWord] + 1 : 1

    // // short-circuit
    // wordCountMap[currWord] = (wordCountMap[currWord] + 1) || 1
  }
  return wordCountMap
}

