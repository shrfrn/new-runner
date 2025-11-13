import { getRunnerLog, clearRunnerLog } from './services/usage-tracking.service.js'
import * as http from './services/http.service.js'

const BUTTON_RESET_DELAY_MS = 2000

function createSubmissionFormData(scriptContent, scriptFile, exerciseId) {
	const file = new File([scriptContent], scriptFile, { type: 'text/javascript' })
	const formData = new FormData()
    
	formData.append('file', file)
	formData.append('exerciseId', exerciseId.toString())
    
    const runnerLog = getRunnerLog()
	if (runnerLog.length) formData.append('runnerLog', JSON.stringify(runnerLog))

	return formData
}

export async function sendScriptToServer(currentExercise, flattenedToc) {
	const exerciseItem = flattenedToc.find(item => item.id === currentExercise)

	if (!exerciseItem) {
		console.error('Exercise not found')
		return { success: false, error: 'Exercise not found' }
	}

	const scriptFile = exerciseItem.solution.files[0]
	const scriptUrl = new URL(`../../submissions/${exerciseItem.solution.folder}/${scriptFile}`, window.location.href)
	const scriptSrc = scriptUrl.href

	const elBtnTest = document.getElementById('test-button')
	const originalText = elBtnTest.textContent

	try {
		elBtnTest.textContent = 'Submitting...'

		const scriptContent = await http.get(scriptSrc)
		const formData = createSubmissionFormData(scriptContent, scriptFile, exerciseItem.id)

		const htmlReport = await http.postForm('/api/test', formData, {
			baseUrl: 'TEST_SERVER',
			credentials: 'include',
		})

		const blob = new Blob([htmlReport], { type: 'text/html' })
		const url = URL.createObjectURL(blob)
        
		window.open(url, '_blank')
        
		setTimeout(() => URL.revokeObjectURL(url), 1000)
        
		elBtnTest.textContent = 'Submitted!'
		setTimeout(() => elBtnTest.textContent = originalText, BUTTON_RESET_DELAY_MS)
        
        clearRunnerLog()
		return { success: true }
	} catch (error) {
		console.log(`%c${error.message}`, 'color: orange; font-weight: bold; font-size: 1.2em;')
		elBtnTest.textContent = originalText

		return { success: false, error: error.message }
	}
}

