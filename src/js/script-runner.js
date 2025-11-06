export function loadAndExecuteScript(currentExercise, flattenedToc) {
	const exerciseItem = flattenedToc.find(item => item.id === currentExercise)

	if (!exerciseItem?.solution?.files?.length) {
		console.error('No script available for this exercise')
		return { success: false, error: 'No script available for this exercise' }
	}

	const scriptFile = exerciseItem.solution.files[0]
	const scriptSrc = `../../submissions/${exerciseItem.solution.folder}/${scriptFile}`
	let elScript = document.getElementById('exercise-script')

	if (elScript) elScript.remove()

	elScript = document.createElement('script')
	elScript.id = 'exercise-script'
	elScript.src = scriptSrc

	elScript.onerror = () => {
		console.clear()
		const errorMsg = `Script not found: \nsubmissions/${exerciseItem.solution.folder}/${scriptFile}`
		console.log(`%c${errorMsg}`, 'color: orange; font-weight: bold; font-size: 1.2em;')
	}

	document.body.appendChild(elScript)

	return { success: true }
}
