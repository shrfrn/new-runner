'use strict'

console.log('Ex 50')
console.log('Build a function makeWater() that makes water')
// CR needed ✏️

// 50.Making Water! Let's imagine that we have the following atoms:
// 'H', 'B', 'C', 'N', 'O', 'F'
// a. Use an array with letters that stands for each atom.
// b. Pick random atoms from the array to create molecules of 3 atoms.
// c. Stop when you got ‘HOH’ for water. (Two Hydrogens and one Oxygen)
// d. Print how many tries you had before ‘HOH’ was drawn.

console.log('It took', makeWater(), 'tries to get HOH')

function makeWater() {
  var atoms = ['H', 'B', 'C', 'N', 'O', 'F']
  var count = 0
  var currMol = ''

  while (currMol !== 'HOH') {
    currMol = ''
    for (var i = 0; i < 3; i++) {
      currMol += atoms[getRandomInt(0, atoms.length)]
    }
    count++
  }
  return count
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
