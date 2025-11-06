'use strict';

console.log("Ex 24")
console.log('my abs');
// reviewed ✔️

// +UnitTesting Play with the function Math.abs(), read the documentation in MDN.
// Implement myAbs(), write the function yourself.


console.log('INPUT: 4')
console.log('EXPECTED: 4')
console.log('ACTUAL: ', myAbs(4))

console.log('INPUT: -2')
console.log('EXPECTED: 2')
console.log('ACTUAL: ', myAbs(2))

console.log('INPUT: 0')
console.log('EXPECTED: 0')
console.log('ACTUAL: ', myAbs(0))



function myAbs(num) {
    if (num >= 0) return num
    return -num
    // return num * -1

    // return (num < 0) ? -num : num
}