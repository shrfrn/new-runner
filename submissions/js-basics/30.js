'use strict'

console.log('EX 30');
console.log('Read 2 names from the user and print the longest');
// CR needed ✏️

// 30. Read 2 names from the user and print the longest.


printLongestName()

function printLongestName() {
    var name1 = prompt('Enter first name')
    var name2 = prompt('Enter second name')

    var longestName = name1

    if (name2.length > name1.length) {
        longestName = name2
    }
    console.log('The longest name is:', longestName);
}
