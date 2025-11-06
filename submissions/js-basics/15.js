console.log('Ex 15');
console.log('Write a function that gets 2 numbers and returns their sum.');
// reviewed ✔️

// Write a function that gets 2 numbers and returns their sum.

console.log('INPUT: num1: 1, num2: 2');
console.log('EXPECTED: 3');
console.log('ACTUAL: ');
var sum = sumTheNums(1, 2);
console.log('sum :>> ', sum);

console.log('INPUT: num1: 0, num2: 0');
console.log('EXPECTED: 0');
console.log('ACTUAL: ');
sum = sumTheNums(0, 0);
console.log('sum :>> ', sum);

console.log('INPUT: num1: -5, num2: 80');
console.log('EXPECTED: 75');
console.log('ACTUAL: ');
sum = sumTheNums(-5, 80);
console.log('sum :>> ', sum);

function sumTheNums(num1, num2) {
  return num1 + num2;
}
