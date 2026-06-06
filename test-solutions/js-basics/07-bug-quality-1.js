console.log('EX 07')
console.log('Sum Checker')

var a=prompt('Enter first number:')  // Poor naming + not converted
var b=prompt('Enter second number:')
var c=prompt('Enter third number:')

if(a+b===c){  // String concatenation bug + no spacing
  console.log(a+' + '+b+' = '+c)
}else{
  console.log(a+' + '+b+' != '+c)
}



