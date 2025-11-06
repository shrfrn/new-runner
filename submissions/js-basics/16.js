console.log('Ex 16');
console.log(
  'Write a function named isEven that gets a number, and returns true if the number is even. Otherwise the function will return false.'
);
// reviewed ✔️

// Write a function named isEven that gets a number, and returns true if the number is even. Otherwise the function will return false.

console.log('INPUT: 2');
console.log('EXPECTED: true');
console.log('ACTUAL: ', isEven(2));

console.log('INPUT: 3');
console.log('EXPECTED: false');
console.log('ACTUAL: ', isEven(3));

console.log('INPUT: -2');
console.log('EXPECTED: true');
console.log('ACTUAL: ', isEven(-2));

function isEven(num) {
  return num % 2 === 0;
}
