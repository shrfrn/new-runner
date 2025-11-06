console.log('Ex 10')
console.log('Friends on FB')
// reviewed ✔️

// EX10: Ask the user how many friends he has on FB and print out an analysis: 
// • More than 500 – ‘OMG, a celebrity!’
// • More than 300 (and up to 500) – ‘You are well connected!’
// • More than 100– ‘You know some people...’
// • Up to 100 – ‘Quite picky aren't you?’
// • 0 – ‘Let’s be friends!’

var friendCount = +prompt('How many friends do you have on FB?')
var msg

if (friendCount > 500) {
    msg = 'OMG, a celebrity!'
} else if (friendCount > 300) {
    msg = 'You are well connected!'
} else if (friendCount > 100) {
    msg = 'You know some people...'
} else if (friendCount > 0) {
    msg = 'Quite picky arent you?'
} else {
    msg = 'Let’s be friends!'
}

console.log(msg)
