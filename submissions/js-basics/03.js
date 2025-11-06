console.log('EX 03')
console.log('Read a temperature in Celsius from the user, and print it converted to Fahrenheit')
// reviewed ✔️

// 3. Read a temperature in Celsius from the user, and print it converted to Fahrenheit

var celsius = +prompt('Please enter degrees in Celsius: ')
var fahrenheit = celsius * (9 / 5) + 32

console.log('Result: ' + celsius + ' Celsius degrees in Fahrenheit is ' + fahrenheit)
