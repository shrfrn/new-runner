'use strict'

console.log('EX 36')
console.log('A function that gets a string of names delimited by a comma and prints the longest name and the shortest name.')
// CR needed ✏️

// +UnitTesting Write a function that gets a string of names delimited by a comma. I.e: 'igal,moshe,haim' and prints the longest name, and the shortest name. Tip: use the function indexOf, note that the function accepts 2 parameters

console.log('INPUT - d,igaladbdmgmne,haim')
console.log('EXPECTED - The longest name is: igaladbdmgmne and the shortest name is: da')
console.log('ACTUAL - ', printNames('igaladbdmgmne,haim,da'))

function printNames(namesStr) {
  var longestName = ''
  var shortestName = namesStr
  var commaIdx = 0
  namesStr += ','

  for (var i = 0; i < namesStr.length; i = commaIdx + 1) { // Omri - corrected to 'commaIdx+1'
    commaIdx = namesStr.indexOf(',', i)
    var name = namesStr.substring(i, commaIdx) // Omri - corrected to 'substring(i, commaIdx)'

    if (name.length > longestName.length) longestName = name
    if (name.length < shortestName.length) shortestName = name
  }
  return 'The longest name is: ' + longestName + ' and the shortest name is: ' + shortestName
}
