console.log('Ex 12')
console.log('Guess Who')
// reviewed ✔️

/*
• Use the alert function, and ask the user to think about an actor
• Use the confirm function and ask the user 2 yes/no questions:
Question 1: Is he a man?
 Yes:
● Question 2: Is he Blonde?
○ Yes: Philip Seymour!
○ No: Tom Cruise!
 No:
● Question 2: Is she English?
○ Yes: Keira Knightley!
○ No: Natalie Portman!
*/

alert('Think about an actor/actress........')

var isMan = confirm('Is he a man?')
if (isMan) {
  var isBlonde = confirm('Is he blonde?')
  if (isBlonde) {
    console.log('Philip Seymour!')
  } else {
    console.log('Tom Cruise!')
  }
} else {
  var isEnglish = confirm('Is she English?')
  if (isEnglish) {
    console.log('Keira Knightley!')
  } else {
    console.log('Natalie Portman!')
  }
}
