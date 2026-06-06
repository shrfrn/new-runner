console.log('EX 08')
console.log('Finding the Smallest Number')

  var num1 = +prompt('Enter first number:')  // Bad indentation
    var num2 = +prompt('Enter second number:')
 var num3 = +prompt('Enter third number:')

var smallest = num1

    if (num2 < smallest) {
  smallest = num2
    }

 if (num3 < smallest) {
      smallest = num3
}

console.log('The smallest number is: ' + smallest)



