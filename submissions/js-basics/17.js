console.log('Ex 17');
console.log('Write a function named getBigger that gets 2 numbers and returns the bigger one');
// reviewed ✔️

// Write a function named getBigger that gets 2 numbers and returns the bigger one

console.log('INPUT: num1: 3, num2: 1');
console.log('EXPECTED: 3');
console.log('ACTUAL: ', getBigger(3, 1));

console.log('INPUT: num1: -5, num2: 7');
console.log('EXPECTED: 7');
console.log('ACTUAL: ', getBigger(-5, 7));

// For very smart people
// console.log('ACTUAL: ', getBiggerHack(3, 1));

function getBigger(num1, num2) {
  if (num1 > num2) {
    return num1;
  }
  return num2;
}

function getBiggerHack(num1, num2) {
  return Math.max(num1, num2);
}
