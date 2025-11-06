console.log('Ex 11')
console.log('Banking system')
// reviewed ✔️

// EX11: Rolling Project: BankSystem
// • Initialize a variable: currBalance with the value: 1000
// • Prompt the user to get a secret pin code, ‘0796’.
// • After it was validated to be true, ask the user how much would he like to withdraw.
// Print a nice message with the new balance.
// • If the code was wrong, alert with a different message, and don’t let him to withdraw
// the sum.
// • Add a feature: don’t let the user withdraw more than he has in his account.

var currBalance = 1000
var pinCode = '0796'
var enteredPinCode = prompt('Please enter your pin code')

if (pinCode !== enteredPinCode) {
  console.error('Wrong pin code')
} else {
  var withdraw = +prompt('How much would you like to withdraw')

  if (withdraw > currBalance) {
    console.error('Maximum amount to withdraw: ', currBalance)
  } else {
    currBalance -= withdraw
    console.log('Your new balance:', currBalance)
  }
}
