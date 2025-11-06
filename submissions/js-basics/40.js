'use strict' // :Sharon - untested

/*
// Exercise 40 - Lorem Ipsum
// 
// Implement a function named getLoremIpsum(wordsCount) which return 
// a sentence with random dummy text (google: lorem ipsum...)
// 
// Here are the steps you may use to solve this:
// 
// Create a string or an array of all the characters in the English alphabet.
// Write a function named getWord() which returns a single word 
// made of 3 - 5 random letters. 
// The length of the word will be generated randomly.
// Call this function in a loop to create a sentence.
*/

var res = getLoremIpsum(4)
console.log('res:', res)

function getLoremIpsum(wordsCount) {
    var sentence = ''

    for (var i = 0; i < wordsCount; i++) {
        sentence += getWord()

        // if (i === wordsCount - 1) sentence += '.'
        // else sentence += ' '
        sentence += (i === wordsCount - 1) ? '.' : ' '
    }
    return sentence
}

function getWord() {
    const letters = 'abcdefghiklmnopqrstvxwyz'
    var randomLength = getRandomInt(3, 5)
    var word = ''

    for (var i = 0; i < randomLength; i++) {
        var randIdx = getRandomInt(0, letters.length - 1);
        word += letters.charAt(randIdx)
    }
    return word
}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}