console.log('EX 09')
console.log('Difference Checker')

  var x=+prompt('Enter first positive number:')  // Poor naming + indentation
    var y=+prompt('Enter second positive number:')
 var z=Math.abs(x-y)

      console.log('Number 1: '+x+', Number 2: '+y+', Difference: '+z)

if(z<x||z<y){  // Wrong logic + no spacing
 console.log('The numbers are relatively close!')
}



