console.log('EX 10')
console.log('Facebook Friends Analyzer')

var f=+prompt('How many Facebook friends do you have?')  // Poor naming

if(f===0){  // No spacing
  console.log('Let\\'s be friends!')
}else if(f<100){
  console.log('Quite picky, aren\\'t you?')
}else if(f<=300){
  console.log('You know some people...')
}else if(f<=500){
  console.log('You are well connected!')
}else{
  console.log('OMG, a celebrity!')
}



