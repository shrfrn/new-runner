'use strict';

console.log("Ex 22");
console.log('Write pow func');
// reviewed ✔️

// +UnitTesting Write a function named myPow that gets 2 parameters: base, exponent and returns the power. (use a loop…)

console.log('INPUT:', 2, 3);
console.log('EXPECTED:', 8);
console.log('ACTUAL: ', myPow(2, 3));

console.log('INPUT: 3,2');
console.log('EXPECTED: 9');
console.log('ACTUAL: ', myPow(3, 2));

console.log('INPUT: 10,3');
console.log('EXPECTED: 1000');
console.log('ACTUAL: ', myPow(10, 3));

function myPow(base, exponent) {
    var power = 1
    while (exponent > 0) {
        power *= base
        exponent--
    }
    return power
}

// function myPow(base, exponent) {
//     var number = base;
//     for (var i = 1; i < exponent; i++) {
//         number *= base;
//     }

//     return (number);
// }


// supports negative exponent

// function myPow(base, exponent) {
//    if (exponent === 0) return 1;
//     var counter = 1;
//     var pow = base;

//     while (counter < Math.abs(exponent)) {
//         pow *= base;
//         counter++;
//     }
//     if (exponent < 0) return (1 / pow);
//     return pow;
// }