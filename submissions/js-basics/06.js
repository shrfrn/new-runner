console.log('Ex 06')
console.log('Quadratic equation')
// reviewed ✔️

// 6. Read 3 variables from the user: a, b, c. These will be the a, b, c variables of a
// quadratic equation. ( (משוואה ריבועית
// a. Calculations for the solution of the quadratic equation:
// • Print to the console the value of “-b”
// • Print to the console the value of “2*a”
// • Print to the console the value of the discriminant. Discriminant=b*b-4*a*c
// b. BONUS:
// Now, a quadratic equation looks like:
// The two solutions for of this equation are X1 and X2:
// Your tasks:
// • Print the quadratic equation as a string to the console
// • Print the solutions of X1 and X2 to the console.
// Example: for the following equation: 2X² – 5x + 2 = 0
// Your inputs are: a=2, b=-5, c=2
// your output to the console should be:
// 2X² - 5x + 2 = 0
// x1 = 2 ; x2 = 0.5
// Hint: To print the x² to the console, use this: string: 'x\u00B2'

var a = +prompt('Enter variable a')
var b = +prompt('Enter variable b')
var c = +prompt('Enter variable c')

var minusB = -b
var doubleA = a * 2
var discriminant = b * b - 4 * a * c

console.log('-b: ' + minusB)
console.log('2*a: ' + doubleA)
console.log('The discriminant is: ', discriminant)

//BONUS:
var equation = ''
var bOperator = ''
var cOperator = ''

if (a) {
    if(a === 1) {
        equation = 'x\u00B2'
    } else {
        equation = a + 'x\u00B2'
    }
}
if (b) {
  if (b > 0 && a) {
    bOperator = '+'
  }
  equation += bOperator + b + 'x'
}
if (c) {
  if (c > 0 && b) {
    cOperator = '+'
  }
  equation += cOperator + c
}

console.log('The quadratic equation is: ' + equation)

if(discriminant < 0) {
    console.log('This quadratic equation has no solution');
} else {
    var x1 = (minusB + discriminant ** 0.5) / doubleA
    console.log('x1: ', x1)
    if(discriminant === 0) {
        console.log('This quadratic equation has a single solution');
    } else {
        var x2 = (minusB - discriminant ** 0.5) / doubleA
        console.log('x2: ', x2)
    }
}

// Example input for single solution:

// X² + 2x + 1 = 0 (solution: x = -1)
// X² + 4x + 4 = 0 (solution: x = -2)
// X² + 6x + 9 = 0 (solution: x = -3)
// X² + 8x + 16 = 0 (solution: x = -4)
// X² + 10x + 25 = 0 (solution: x = -5)

// −X² + 4x − 4 = 0 (solution: x = 2)
// −2X² − 8x − 8 = 0 (solution: x = -2)

// Example input for two solutions:
// 4X² + 26x + 12 = 0 (-6, -.5)
// X² + 5x - 4 = 0 (-5.701, 0.701)
// X² + 5x + 6 = 0 (-2, -3)
// X² + 10x + 16 = 0 (-2, -8)
// −3X² − 11x − 6 = 0 (7, -7)

// Example input for no solution:
// X² + x + 5 = 0
// X² + x + 4 = 0
// X² + 5x + 12 = 0
// −3x² − 6x − 5 = 0