'use strict'

console.log('Ex 43')
console.log('Sum arrays')
// reviewed ✔️

// EX43 Write the function sumArrays that gets 2 arrays and returns the sum of the two
// arrays. I.e: [1, 4, 3] [2, 5, 1, 9] => [3, 9, 4, 9]
// TIP: this can be done in a single loop by first identifying the shorter or longer array from the two.
// Step2: Read these arrays from the user (until the number 999 is entered) TIP: write the function: getArrayFromUser and call it twice

// var nums1 = getArrayFromUser()
// var nums2 = getArrayFromUser()
var nums1 = [1, 4, 3]
var nums2 = [2, 5, 1, 9]

console.log('INPUT: ', nums1, nums2)
console.log('ACTUAL: ', sumArrays(nums1, nums2))

function sumArrays(nums1, nums2) {
  var shorterNums = nums1.length > nums2.length ? nums2.slice() : nums1.slice()
  var longerNums = nums1.length > nums2.length ? nums1.slice() : nums2.slice()

  for (var i = 0; i < shorterNums.length; i++) {
    if (isNaN(longerNums[i]) || isNaN(shorterNums[i]))
      return console.error('One of the inputs in the array is not a number')
    longerNums[i] += shorterNums[i]
  }
  return longerNums
}

function getArrayFromUser() {
  const MSG = 'Please enter a number, (enter 999 to QUIT)'
  var num = +prompt(MSG)
  var nums = []
  while (num !== 999) {
    nums.push(num)
    num = +prompt(MSG)
  }
  return nums
}

//Todo expected result
// function getArrayFromUser(){
//     return [2, 5, 1, 9]
// }
