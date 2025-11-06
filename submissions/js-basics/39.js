'use strict' // :Sharon - untested

/*
// Exercise 39 - Count Votes
// 
// Implement a function named countVotes(votes, candidateName) 
// which counts how many votes a candidate received.
// 
// For example: if the votes array looks like this: 
// ['Nuli', 'Pingi', 'Uza', 'Shabi', ‘Uza’],
// and the candidate name is 'Uza',the function returns 2.
*/

var votes = ['Nuli', 'Pingi', 'Uza', 'Shabi', 'Uza']
var candidateName = 'Uza'

console.log('INPUT: ', votes, candidateName)
console.log('EXPECTED: ', 2)
console.log('ACTUAL:', countVotes(votes, candidateName))

function countVotes(votes, candidateName) {
    var count = 0
    for (var i = 0; i < votes.length; i++) {
        if (votes[i] === candidateName) count++
    }
    return count
}