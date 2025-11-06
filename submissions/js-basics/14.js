console.log('Ex 14');
console.log('Write a function that gets a user name as a parameter and greets the user.');
// reviewed ✔️

// Write a function that gets a user name as a parameter and greets the user.


console.log('INPUT: Puki Ben David');
console.log('EXPECTED: Hello and welcome Puki Ben David');
console.log('ACTUAL: ');
greetUser('Puki Ben David');

function greetUser(username) {
  console.log('Hello and welcome', username);
}
