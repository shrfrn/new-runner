console.log('Ex 09')
console.log('Difference between two positive numbers');
// reviewed ✔️

// EX09: Read 2 positive numbers from the user. Calculate the difference between the two of 
// them (the absolute value).
// If the diff variable is smaller than both values, print that those numbers are 
// relatively-close (i.e. – num1=5, num2=9 then diff=4 => relatively-close!)
// • Validate that your values are numbers (hint: google something like: ‘javascript 
// check if number’)

var num1 = +prompt('Please enter a number')
var num2 = +prompt('Please enter another number')
var diff

if (isNaN(num1) || isNaN(num2)) {
    console.log('Invalid input - not numbers')
} else if (num1 < 0 || num2 < 0) {
    console.log('Invalid input - negative numbers')
} else {
    if (num1 > num2) {
        diff = num1 - num2
    } else {
        diff = num2 - num1
    }

    // // Another option 
    // diff = num1 - num2
    // if (diff < 0) {
    //     diff *= -1
    // }

    // Another option
    // diff = Math.abs(num1 - num2)

    if (diff < num1 && diff < num2) {
        console.log('Numbers are relatively close')
    }
    console.log('The diff between the numbers is: ', diff)
}
