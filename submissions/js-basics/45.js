'use strict'

console.log('Ex 45')
console.log('Remove duplicates')
// reviewed ✔️

// Write the function removeDuplicates(nums). The array nums should contain numbers in the range of 0-5 such as: 5 4 5 1  4
// the function returns a new array in which each value appears only once (e.g. in this case: 5, 4, 1)
// TIP: Notice that the values are in a specific range.

var nums = [5, 1, 5, 1, 0]

console.log('INPUT: [5, 1, 5, 1, 0]')
console.log('EXPECTED: [5, 1, 0]')
console.log('ACTUAL:', removeDuplicates(nums))

nums = []
console.log('INPUT: []')
console.log('EXPECTED: Array is empty')
console.log('ACTUAL:', removeDuplicates(nums))

function removeDuplicates(nums) {
  var numCounters = [0, 0, 0, 0, 0, 0]
  var res = []
  for (var i = 0; i < nums.length; i++) {
    if (numCounters[nums[i]] === 0) {
      numCounters[nums[i]]++
      res.push(nums[i])
    }
  }
  return res
}

//Another Option o(n^2)
// function removeDuplicates(nums) {
//     var res = []
//     for (var i = 0; i < nums.length; i++) {
//         if (!res.includes(nums[i])) res.push(nums[i])
//     }
//     return res
// }

// Another option - Avior (o^2) - no includes
// function removeDuplicates(nums) {
//   var res = []

//   for (var i = 0; i < nums.length; i++) {
//     var isDuplicate = false
//     var currNum = nums[i]
//     for (var j = 0; j < res.length; j++) {
//       if (currNum === res[j]) {
//         isDuplicate = true
//         break
//       }
//     }

//     if (!isDuplicate) res.push(currNum)
//   }
//   return res
// }
