console.log('Ex 18');
console.log('This function checks if the age is above 18');
// reviewed ✔️

// Write a function named isAbove18 that gets a name and an age. This function checks if the age is above eighteen. In case the user is younger than eighteen, alert 'You are too young', otherwise alert 'You're allowed to buy a beer' (Use the user's name within the alerts). Also, the function should return a boolean value. * For now, we will make no use of the returned value.

console.log('INPUT: username: puki, age: 12');
console.log('EXPECTED: false');
console.log('ACTUAL: ', isAbove18('Puki Ben David', 12));

console.log('INPUT: username: puki, age: 18');
console.log('EXPECTED: true');
console.log('ACTUAL: ', isAbove18('Puki Ben David', 18));

console.log('INPUT: username: puki, age: 54');
console.log('EXPECTED: true');
console.log('ACTUAL: ', isAbove18('Puki Ben David', 54));

function isAbove18(username, age) {
  if (age < 18) {
    alert('Sorry ' + username + ' You are a minor...');
    return false;
  }
  alert(username + " You're allowed to buy a beer");
  return true;
}
