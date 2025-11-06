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

	const runButton = document.getElementById('run-button')
	const testButton = document.getElementById('test-button')
	const copyButton = document.getElementById('copy-button')

	if (hasScript) {
		const scriptFile = exerciseItem.solution.files[0]
		runButton.title = `Run ${exerciseItem.solution.folder}/${scriptFile}`
		testButton.title = `Test ${exerciseItem.solution.folder}/${scriptFile}`
	} else {
		runButton.title = `No script available for this exercise`
		testButton.title = `No script available for this exercise`
	}

	if (exerciseItem) {
		copyButton.title = `Copy exercise text as comments`
	} else {
		copyButton.title = `No exercise selected`
	}
}

export async function copyExerciseAsComments() {
	try {
		const contentElement = document.getElementById('markdown-content')
		let plainText = contentElement.innerText

		plainText = plainText.trim()

		if (!plainText) throw new Error('No content to copy')

		const commentedText = '/*\n// ' + plainText.replace(/\n/g, '\n// ') + '\n*/'

		await navigator.clipboard.writeText(commentedText)

		const copyButton = document.getElementById('copy-button')
		const originalText = copyButton.textContent

		copyButton.textContent = 'Copied!'
		setTimeout(() => copyButton.textContent = originalText, 2000)

	} catch (error) {
		console.error('Error copying exercise text:', error)
		alert(`Error copying exercise text: ${error.message}`)
	}
}

export function setupButtons(onRun, onTest, onCopy) {
	const runButton = document.getElementById('run-button')
	const testButton = document.getElementById('test-button')
	const copyButton = document.getElementById('copy-button')

	runButton.addEventListener('click', onRun)
	testButton.addEventListener('click', onTest)
	copyButton.addEventListener('click', onCopy)
}

