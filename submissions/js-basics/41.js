'use strict' // :Sharon - untested

console.log('Ex 41')
console.log('prints each digit in words')
// CR needed ✏️

//  EX41 +UnitTesting Write a function named sayNum(num) that prints each digit in words.
// I.e: 123 => One Two Three. 7294 => Seven Two Nine Four. TIP: You may use
// Switch inside a loop OR an array named digitNames. (Or what the heck, try them
// both.)

console.log('INPUT:', 325)
console.log('EXPECTED:', 'three two five')
console.log('ACTUAL:', sayNum(325))

console.log('INPUT:', 0)
console.log('EXPECTED:', 'zero')
console.log('ACTUAL:', sayNum(0))

function sayNum(num) {
	const digitNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

	var numsStr = '' + num //'325'
	var digitStr = ''

	for (var i = 0; i < numsStr.length; i++) {
		var currNum = +numsStr.charAt(i) // 3
		digitStr += digitNames[currNum] + ' '
	}
	return digitStr.trim()
}

// WITH SWITCH
function sayNum2(num) {
	var str = ''
	num += ''
    
	for (var i = 0; i < num.length; i++) {
		var currNum = num[i]
		switch (currNum) {
			case '1':
				str += 'One '
				break
			case '2':
				str += 'Two '
				break
			case '3':
				str += 'Three '
				break
			case '4':
				str += 'Four '
				break
			case '5':
				str += 'Five '
				break
			case '6':
				str += 'Six '
				break
			case '7':
				str += 'Seven '
				break
			case '8':
				str += 'Eight '
				break
			case '9':
				str += 'Nine '
				break
			case '0':
				str += 'Zero '
				break
		}
	}
	return str.trim()
}
