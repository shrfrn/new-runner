console.log('EX 10')
console.log('Facebook Friends Analyzer')

var friends = +prompt('How many Facebook friends do you have?')

if (friends < 100) {  // Missing check for 0
  console.log('Quite picky, aren\\'t you?')
} else if (friends <= 300) {
  console.log('You know some people...')
} else if (friends <= 500) {
  console.log('You are well connected!')
} else {
  console.log('OMG, a celebrity!')
}



