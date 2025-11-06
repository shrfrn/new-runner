"use strict";

console.log("Ex 44");
console.log("counts the appearances of the numbers");
// reviewed ✔️

// EX44 Write the function printNumsCount(nums). The array nums will contain integers in the
// range of 0-3 such as:
// [3,2,0,2,2,0,3]
// GUIDANCE: the fact that the values are in a specific range allows us to use an array
// where the index is actually the number itself. The value in the array counts the
// appearances of the numbers.

var nums = [3, 2, 0, 2, 3];

console.log("INPUT: ", nums);
console.log("EXPECTED: [1, 0, 2, 2]");
console.log("ACTUAL:", printNumsCount(nums));

nums = [3, 2, 0, 2, 8];
console.log("INPUT: ", nums);
console.log("EXPECTED: Not valid number");
console.log("ACTUAL:", printNumsCount(nums));

nums = [3, 2, 0, 2, -3];
console.log("INPUT: ", nums);
console.log("EXPECTED: Not valid number");
console.log("ACTUAL:", printNumsCount(nums));

function printNumsCount(nums) {
  var counts = [0, 0, 0, 0];
  for (var i = 0; i < nums.length; i++) {
    var num = nums[i];
    if (isNaN(num) || num < 0 || num > 3) return "Not valid number";
    counts[num]++;
  }

  // for (var i = 0; i < counts.length; i++) {
  //   console.log('The number', i, 'appears', counts[i], 'times');
  // }

  return counts;
}
