console.log('EX 09')
console.log('Difference Checker')

var a=+prompt('Enter first positive number:')  // Poor naming
var b=+prompt('Enter second positive number:')
var d=Math.abs(a-b)  // No spacing

console.log('Number 1: '+a+', Number 2: '+b+', Difference: '+d)

if(d<a&&d<b){
  console.log('The numbers are relatively close!')
}



