'use strict'

console.log('Ex 49');
console.log('get nth lagest num');
// CR needed ✏️

// 48.+UnitTesting Write the function getNthLargest(nums, nthNum) to get the nth largest element from an array of unique numbers. I.e: getNthLargest ([ 7, 56, 23, 8928, , 99, 89, 11], 3) Result: 89 



console.log('INPUT: [7, 56, 23, 88, 92, 99, 89, 11]');
console.log('EXPECTED: 89');
console.log('ACTUAL: ', getNthLargest([7, 56, 23, 88, 92, 99, 89, 11], 3));

console.log('INPUT: [7, 56, 101, 100, 92, 99, 89, 11]');
console.log('EXPECTED: 100');
console.log('ACTUAL: ', getNthLargest([7, 56, 101, 100, 92, 99, 89, 11], 2));

console.log('INPUT: [7, 56, 101, 100, 92, 99, 89, 11]');
console.log('EXPECTED: 100');
console.log('ACTUAL: ', getNthLargestBonus([7, 56, 101, 100, 92, 99, 89, 11], 2));


function getNthLargest(nums, nthNum) {
    nums.sort(function (num1, num2) {
        return num1 - num2
    })
    return nums[nums.length - nthNum]
}

// function getNthLargest(nums, nthNum) {
//     nums.sort(function (num1, num2) {
//         return num2 - num1
//     })
//     return nums[nthNum - 1]
// }

function getNthLargestBonus(nums, nthNum) {
    var currLargestNumIdx = 0
    for (var i = 0; i < nthNum; i++) {
        var currLargestNum = -Infinity
        for (var j = 0; j < nums.length; j++) {
            if (nums[j] > currLargestNum) {
                currLargestNum = nums[j]
                currLargestNumIdx = j
            }
        }
        nums.splice(currLargestNumIdx, 1)
    }
    return currLargestNum
}