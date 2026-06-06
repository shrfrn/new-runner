console.log('EX 11')
console.log('Banking system')

var currBalance = 1000
var PIN = '0796'
var enteredPinCode = prompt('Please enter your pin code')

if (PIN !== enteredPinCode) {
  console.log('Incorrect PIN. Access denied.')
} else {
  var withdraw = +prompt('How much would you like to withdraw?')

  // Missing balance check - allows overdraft
  currBalance -= withdraw
  console.log('Withdrawal successful. Your new balance is: ' + currBalance)
}



