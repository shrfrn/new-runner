'use strict'

console.log('EX 57')
console.log(
  'Print out the number that appears most frequently in the multi-dimensional array'
)
// reviewed ✔️

// 57. Write the function findMode(mat) that will print out the number that appears most frequently in the multi-dimensional array.
// BONUS: If there are ties (e.g.: both 47 and 53 appeared 17 times), print both of them, or all of them. (TIP: use an object map to count the numbers)

var mat = [
  [4, 5, 2, 0],
  [5, 1, 2, 4],
  [3, 0, 9, 4],
  [5, 6, 8, 1],
]

//{4:3,5:3} -->key:the num in the matrix, value - times appear
console.log('INPUT:')
console.table(mat)
console.log('EXPECTED: The numbers: 4, 5 appeared 3 times')
console.log('ACTUAL:')
findMode(mat)

function findMode(mat) {
  var itemCountMap = {}
  //mat.length height - num of arrays inside
  //mat[0].length width - num of cols in a row , row length
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat[0].length; j++) {
      var item = mat[i][j]
      if (!itemCountMap[item]) itemCountMap[item] = 0
      itemCountMap[item]++
    }
  }
  console.log('itemCountMap', itemCountMap)
  //No Bonus
  // var mostFrequentItem
  // var max = 0

  // for (var item in itemCountMap) {
  //   if (itemCountMap[item] > max) {
  //     max = itemCountMap[item]
  //     mostFrequentItem = item
  //   }
  // }
  // console.log('The number: ' + mostFrequentItem + ' appeared ' + max + ' times')

  //   BONUS
  var mostFrequentItems = []
  var max = 0

  for (var item in itemCountMap) {
    if (itemCountMap[item] > max) {
      max = itemCountMap[item]
      mostFrequentItems = [item]
    } else if (itemCountMap[item] === max) {
      mostFrequentItems.push(item)
    }
  }

  // console.log('The numbers: ' + mostFrequentItems.join(', ') + ' appeared ' + max + ' times')
}

//shani solution Bonus
function findModes(mat) {
  var countMap = {}
  var modes = []
  var mode = -Infinity
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat[0].length; j++) {
      var num = mat[i][j]
      countMap[num] = countMap[num] + 1 || 1
      if (countMap[num] > mode) {
        modes = [num]
        mode = countMap[num]
      } else if (countMap[num] === mode) modes.push(num)
    }
  }
  console.log('countMap', countMap)
  console.log('The modes are', modes)
}
