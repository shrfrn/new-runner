console.log('EX 10')
console.log('Facebook Friends Analyzer')

  var x=+prompt('How many Facebook friends do you have?')  // Poor naming + indentation

    if(x===0){  // Bad indentation + no spacing
 console.log('Let\\'s be friends!')
}else if(x<100){
      console.log('Quite picky, aren\\'t you?')
  }else if(x<300){  // Wrong comparison
  console.log('You know some people...')
}else if(x<500){  // Wrong comparison
     console.log('You are well connected!')
}else{
  console.log('OMG, a celebrity!')
}



