'use strict'

console.log('Ex 46')
console.log('multBy nums array')
// CR needed ✏️

// EX46: +UnitTesting Write the function: multBy(nums, multiplier) that returns a modified array in which each item in the array is multiplied by a multiplier.
// Step2: Add another param: isImmutable. It will be a variable that when it’s value is set to true, use array.slice() to work on a new array. Leave the original array as it was. 

var nums = [5, -4, 0, 1]

console.log('INPUT:', nums, 'multiplier', 3)
console.log('EXPECTED: [15, -12, 0, 3]')
console.log('ACTUAL:', multBy(nums, 3, true))

function multBy(nums, multiplier) {
    for (var i = 0; i < nums.length; i++) {
        nums[i] *= multiplier;
    }
    return nums
}

//Part b
function multBy(nums, multiplier, isImmutable) {
    var newNums = isImmutable ? nums.slice() : nums
    for (var i = 0; i < newNums.length; i++) {
        newNums[i] *= multiplier
    }
    return newNums
}

