console.log('Ex 13')
console.log('The Elevator')
// reviewed ✔️

// • Keep a currentFloor variable, initialize it to 0
// • Ask the user which floor would he like to go to.
// • Validate the floor is between -2 and 4.
// • Update the currentFloor variable accordingly.
// • Let the user know his current floor.
// • If the user goes to floor 0 alert 'Bye Bye'.
// • If the user goes to the parking lot (negative floors) alert: 'Drive Safely'.

var currFloor = 0
var wantedFloor = +prompt('Which floor you would like to go to?')

if (wantedFloor >= -2 && wantedFloor <= 4) {
  currFloor = wantedFloor
  console.log('Your current floor is', currFloor)

  if (currFloor === 0) {
    alert('Bye bye...')
  } else if (currFloor < 0) {
    alert('Drive safely!')
  }
} else {
  console.log('Invalid floor. choose one from -2 to 4.')
}
