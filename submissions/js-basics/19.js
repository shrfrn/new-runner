'use strict';

console.log('Ex 19');
console.log(
  'Read 10 numbers from the user, if the number is even, print it, otherwise print that the number is odd.'
);
// reviewed ✔️

// Read 10 numbers from the user, if the number is even, print it, otherwise print that the number is odd.

var count = 0;

while (count < 10) {
  var num = +prompt('Enter a number');
  if (num % 2 === 0) {
    console.log('The number ' + num + ' is Even');
  } else {
    console.log('The number ' + num + ' is Odd');
  }
  count++;
}

// for (var i = 0; i < 10; i++) {
//   num = +prompt('Enter a number');
//   if (num % 2 === 0) {
//     console.log('The number ' + num + ' is Even');
//   } else {
//     console.log('The number ' + num + ' is Odd');
//   }
// }
