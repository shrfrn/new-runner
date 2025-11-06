// Button state management helpers
export function setButtonState(runEnabled, testEnabled, copyEnabled) {
	document.getElementById('run-button').disabled = !runEnabled
	document.getElementById('test-button').disabled = !testEnabled
	document.getElementById('copy-button').disabled = !copyEnabled
}

export function enableAllButtons() {
	setButtonState(true, true, true)
}

export function disableAllButtons() {
	setButtonState(false, false, false)
}

export function updateRunButton(id, flattenedToc) {
	const exerciseItem = flattenedToc.find(item => item.id === id)
	const hasScript = exerciseItem?.solution?.files?.length > 0

	setButtonState(hasScript, hasScript, !!exerciseItem)

	const elBtnRun = document.getElementById('run-button')
	const elBtnTest = document.getElementById('test-button')
	const elBtnCopy = document.getElementById('copy-button')

	if (hasScript) {
		const scriptFile = exerciseItem.solution.files[0]
		elBtnRun.title = `Run ${exerciseItem.solution.folder}/${scriptFile}`
		elBtnTest.title = `Test ${exerciseItem.solution.folder}/${scriptFile}`
	} else {
		elBtnRun.title = `No script available for this exercise`
		elBtnTest.title = `No script available for this exercise`
	}

	if (exerciseItem) {
		elBtnCopy.title = `Copy exercise text as comments`
	} else {
		elBtnCopy.title = `No exercise selected`
	}
}

export async function copyExerciseAsComments() {
	try {
		const elContent = document.getElementById('markdown-content')
		let plainText = elContent.innerText

		plainText = plainText.trim()

		if (!plainText) throw new Error('No content to copy')

		const commentedText = '/*\n// ' + plainText.replace(/\n/g, '\n// ') + '\n*/'

		await navigator.clipboard.writeText(commentedText)

		const elBtnCopy = document.getElementById('copy-button')
		const originalText = elBtnCopy.textContent

		elBtnCopy.textContent = 'Copied!'
		setTimeout(() => elBtnCopy.textContent = originalText, 2000)

	} catch (error) {
		console.error('Error copying exercise text:', error)
		alert(`Error copying exercise text: ${error.message}`)
	}
}

export function setupButtons(onRun, onTest, onCopy) {
	const elBtnRun = document.getElementById('run-button')
	const elBtnTest = document.getElementById('test-button')
	const elBtnCopy = document.getElementById('copy-button')

	elBtnRun.addEventListener('click', onRun)
	elBtnTest.addEventListener('click', onTest)
	elBtnCopy.addEventListener('click', onCopy)
}

