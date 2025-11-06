console.log('EX 04')
console.log('Read a number from the user for distance and a number for speed and print the time.')
// reviewed ✔️

// 4. Read a number from the user for distance and a number for speed and print the time.

var distance = +prompt('Enter a distance (km):')
var speed = +prompt('Enter speed (km/h):')

var time = distance / speed

console.log('Result:')
console.log('For the distance: ' + distance + ' kilometers')
console.log('and the speed: ' + speed + ' km/h')
console.log('it will take ' + time + ' hours to get to the destination')
