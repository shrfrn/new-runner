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

let authButton = null
let authAnnouncement = null
let authState = 'signed-out'
let onNavigateAuth = null
let onLogout = null

export function setupButtons(onRun, onTest, onCopy, navigateAuth, logoutHandler) {
	const runButton = document.getElementById('run-button')
	const testButton = document.getElementById('test-button')
	const copyButton = document.getElementById('copy-button')

	if (runButton) runButton.addEventListener('click', onRun)
	if (testButton) testButton.addEventListener('click', onTest)
	if (copyButton) copyButton.addEventListener('click', onCopy)

	authButton = document.querySelector('.auth-button')
	authAnnouncement = document.querySelector('.auth-status-announcement')
	onNavigateAuth = navigateAuth
	onLogout = logoutHandler

	if (authButton) authButton.addEventListener('click', onAuthButtonClick)
}

export function setAuthButtonToSignIn() {
	if (!authButton) return

	authState = 'signed-out'
	authButton.dataset.authState = 'signed-out'
	authButton.textContent = 'Sign In'
	authButton.setAttribute('aria-label', 'Sign in to your account')
	authButton.removeAttribute('aria-pressed')
	announceAuthState('You are signed out')
}

export function setAuthButtonToSignOut(fullname) {
	if (!authButton) return

	authState = 'signed-in'
	authButton.dataset.authState = 'signed-in'
	authButton.textContent = 'Sign Out'
	authButton.setAttribute('aria-label', fullname ? `Sign out ${fullname}` : 'Sign out')
	authButton.setAttribute('aria-pressed', 'true')
	announceAuthState(fullname ? `Signed in as ${fullname}` : 'Signed in')
}

function onAuthButtonClick(event) {
	if (!authButton) return

	if (authState === 'signed-in') {
		if (onLogout) onLogout(event)
		return
	}

	if (onNavigateAuth) onNavigateAuth(event)
}

function announceAuthState(message) {
	if (!authAnnouncement) return

	authAnnouncement.textContent = ''
	setTimeout(() => {
		authAnnouncement.textContent = message
	}, 0)
}

