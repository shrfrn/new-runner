console.log('EX 08')
console.log('Finding the Smallest Number')

  var x=+prompt('Enter first number:')  // Poor naming + indentation
    var y=+prompt('Enter second number:')
 var z=+prompt('Enter third number:')

var m=x

    if(y<m){  // Bad indentation + no spacing
  m=y
    }
 else if(z<m){  // Wrong logic (else if)
      m=z
}

console.log('The smallest number is: '+m)



