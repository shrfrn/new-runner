console.log('EX 11')
console.log('Banking system')

  var x=1000  // Poor naming + indentation
    var y='0796'
 var z=prompt('Please enter your pin code')

if(y!==z){
      console.log('Incorrect PIN. Access denied.')
}else{
 var a=+prompt('How much would you like to withdraw?')

  // Missing balance check + bad formatting
      x-=a
 console.log('Withdrawal successful. Your new balance is: '+x)
}



