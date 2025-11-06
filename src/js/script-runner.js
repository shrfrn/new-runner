export function loadAndExecuteScript(currentExercise, flattenedToc) {
	const exerciseItem = flattenedToc.find(item => item.id === currentExercise)

	if (!exerciseItem?.solution?.files?.length) {
		console.error('No script available for this exercise')
		return { success: false, error: 'No script available for this exercise' }
	}

	const scriptFile = exerciseItem.solution.files[0]
	const scriptSrc = `../../submissions/${exerciseItem.solution.folder}/${scriptFile}`
	let script = document.getElementById('exercise-script')

	if (script) script.remove()

	script = document.createElement('script')
	script.id = 'exercise-script'
	script.src = scriptSrc

	script.onerror = () => {
		console.clear()
		const errorMsg = `Script not found: \nsubmissions/${exerciseItem.solution.folder}/${scriptFile}`
		console.log(`%c${errorMsg}`, 'color: orange; font-weight: bold; font-size: 1.2em;')
	}

	document.body.appendChild(script)

	return { success: true }
}
