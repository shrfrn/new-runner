console.log('EX 04')
console.log('Time Calculator')

var distance = +prompt('Enter distance (km):')
var speed = +prompt('Enter speed (km/h):')
var time = distanse / speed  // ReferenceError: distanse is not defined

console.log('Time required: ' + time + ' hours')



