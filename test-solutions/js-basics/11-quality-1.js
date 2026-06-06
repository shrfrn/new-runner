console.log('EX 11')
console.log('Banking system')

var b=1000  // Poor naming
var p='0796'
var e=prompt('Please enter your pin code')

if(p!==e){  // No spacing
  console.log('Incorrect PIN. Access denied.')
}else{
  var w=+prompt('How much would you like to withdraw?')

  if(w>b){
    console.log('Sorry, your balance is insufficient. Your current balance is: '+b)
  }else{
    b-=w
    console.log('Withdrawal successful. Your new balance is: '+b)
  }
}



