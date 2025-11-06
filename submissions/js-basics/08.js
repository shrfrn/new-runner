console.log('Ex 08')
console.log('The smallest number')
// reviewed ✔️

// 8. Read 3 numbers from the user and print the smallest one.

var num1 = +prompt('First number?')
var num2 = +prompt('Second number?')
var num3 = +prompt('Third number?')

var smallestNum = num3

if (num2 < smallestNum) {
  smallestNum = num2
}
if (num1 < smallestNum) {
  smallestNum = num1
}

console.log('The smallest number is:', smallestNum)

// Another option:

// if (num1 > num2) {
//     if (num3 > num2) {
//         smallestNum = num2
//     }
// } else {
//     if (num3 > num1) {
//         smallestNum = num1
//     }
// }

// Another option:

// if (num1 > num2) {
//     if (num3 > num2) {
//         smallestNum = num2
//     } else {
//         smallestNum = num3
//     }
// } else {
//     if (num3 > num1) {
//         smallestNum = num1
//     } else {
//         smallestNum = num3
//     }
// }

// Another option:

if (num1 < num3 && num1 < num2) {
  console.log('The first number is the smallest: ', num1)
} else if (num2 < num1 && num2 < num3) {
  console.log('The second number is the smallest: ', num2)
} else {
  console.log('The third number is the smallest: ', num3)
}
