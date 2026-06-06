console.log('EX 08')
console.log('Finding the Smallest Number')

var a=+prompt('Enter first number:')  // Poor naming
var b=+prompt('Enter second number:')
var c=+prompt('Enter third number:')

var s=a

if(b>s){  // Wrong operator + no spacing
  s=b
}

if(c>s){
  s=c
}

console.log('The smallest number is: '+s)



