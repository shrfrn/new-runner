'use strict' // :Sharon - untested

/*
// Exercise 38 - Bigger than 100
// 
// Implement a function named biggerThan100. 
// It receives an array of numbers and returns a new array 
// containing only the numbers which are greater than 100.
*/

console.log('INPUT: [1, 3, 400, 60, 300, 500]')
console.log('EXPECTED: [400, 300, 500]')
console.log('ACTUAL:', biggerThan100([1, 3, 400, 60, 300, 500]))

function biggerThan100(nums) {
    var biggerNums = []

    for (var i = 0; i < nums.length; i++) {
        if (nums[i] > 100) biggerNums.push(nums[i])
    }
    return biggerNums
}