import toc from '../../exercises/toc.js'
import md from './markdown-it-wrapper.js'

let currentActiveItem = null
let currentExercise = null

document.addEventListener('DOMContentLoaded', init)

function init() {
	renderSidebar(toc.sidebar)

	// Set up the Run button
	setupRunButton()

	// Set up the Test button
	setupTestButton()

	// Set up the Copy button
	setupCopyButton()

	// Handle popstate events for browser back/forward navigation
	window.addEventListener('popstate', event => {
		if (event.state && event.state.exPath) {
			loadMarkdownContent(event.state.exPath, false)
			updateActiveNavItem(event.state.exPath)
		}
	})

	// Check if there's a hash in the URL to load specific content on page load
	const hash = window.location.hash.substring(1)
	if (hash) {
		loadMarkdownContent(hash, false)
		updateActiveNavItem(hash)
	}
}

// Set up the Run button functionality
function setupRunButton() {
	const runButton = document.getElementById('run-button')

	runButton.addEventListener('click', () => {
		if (!currentExercise) return

		// Load and execute the corresponding JavaScript file from the submissions folder
		loadAndExecuteScript()
	})
}

// Set up the Test button functionality
function setupTestButton() {
	const testButton = document.getElementById('test-button')

	testButton.addEventListener('click', () => {
		if (!currentExercise) return

		// Send the current script to the server for testing
		sendScriptToServer()
	})
}

// Set up the Copy button functionality
function setupCopyButton() {
	const copyButton = document.getElementById('copy-button')

	copyButton.addEventListener('click', async () => {
		if (!currentExercise) return

		// Copy the exercise text as comments to the clipboard
		await copyExerciseAsComments()
	})
}

// Function to copy the exercise text as comments to the clipboard
async function copyExerciseAsComments() {
	try {
		// Get the rendered content from the DOM
		const contentElement = document.getElementById('markdown-content')

		// Get the text content of the rendered HTML (this automatically removes HTML tags)
		let plainText = contentElement.innerText

		// Clean up the text (remove extra whitespace, etc.)
		plainText = plainText.trim()

		// If there's no content, show an error
		if (!plainText) {
			throw new Error('No content to copy')
		}

		// Convert the plain text to JavaScript comments with block comment markers
		// Add /* at the beginning and */ at the end to make it collapsable in VSCode
		// Also add // at the beginning of each line for better readability
		const commentedText = '/*\n// ' + plainText.replace(/\n/g, '\n// ') + '\n*/'

		// Copy the commented text to the clipboard
		await navigator.clipboard.writeText(commentedText)

		// Provide visual feedback that the copy was successful
		const copyButton = document.getElementById('copy-button')
		const originalText = copyButton.textContent
		copyButton.textContent = 'Copied!'

		// Reset the button text after a short delay
		setTimeout(() => {
			copyButton.textContent = originalText
		}, 2000)

	} catch (error) {
		console.error('Error copying exercise text:', error)
		alert(`Error copying exercise text: ${error.message}`)
	}
}

// Function to send the current script to the server for testing
async function sendScriptToServer() {
    // Find the current exercise in the TOC
    const exerciseItem = findExerciseInToc(currentExercise)

    // Get the first file from the files array (which should be the JS file)
    const scriptFile = exerciseItem.solution.files[0]
    const scriptSrc = `../../Submissions/${exerciseItem.solution.folder}/${scriptFile}`

	// Get the test button to update its text
	const testButton = document.getElementById('test-button')
	const originalText = testButton.textContent

	try {
		// Update button text to show submission is in progress
		testButton.textContent = 'Submitting...'
		// Fetch the script content
		const response = await fetch(scriptSrc)
		if (!response.ok) {
			throw new Error(`Failed to load script: ${response.status} ${response.statusText}`)
		}

		// Get the script content as text
		const scriptContent = await response.text()

		// Create a File object from the script content
		const file = new File([scriptContent], scriptFile, { type: 'text/javascript' })

		// Create a FormData object and append the file and exerciseId
		const formData = new FormData()
		formData.append('file', file)

		// Extract just the number from the exercise ID (e.g., '55' from 'js-basics/55-matrix-operations')
		let exerciseNumber = ''
		const match = currentExercise.match(/\/([0-9]+)/) // Match the number after the slash
		if (match && match[1]) {
			exerciseNumber = match[1]
		} else {
			// If we can't extract the number, log an error and use the full path as fallback
			console.warn(`Could not extract exercise number from ${currentExercise}, using full path instead`)
			exerciseNumber = currentExercise
		}

		formData.append('exerciseId', exerciseNumber)

		// We'll use fetch to send the data directly

		// Send the POST request using fetch and open the response in a new tab
		const serverResponse = await fetch('http://localhost:3000/api/test', {
			method: 'POST',
			body: formData
		})

		if (!serverResponse.ok) {
			throw new Error(`Server error: ${serverResponse.status} ${serverResponse.statusText}`)
		}

		// Get the HTML response
		const htmlReport = await serverResponse.text()

		// Create a blob from the HTML response
		const blob = new Blob([htmlReport], { type: 'text/html' })

		// Create a URL for the blob
		const url = URL.createObjectURL(blob)

		// Open the URL in a new tab
		window.open(url, '_blank')

		// Clean up the URL object after the tab is opened
		setTimeout(() => URL.revokeObjectURL(url), 1000)

		// Update button text to show submission was successful
		testButton.textContent = 'Submitted!'

		// Reset the button text after a short delay
		setTimeout(() => {
			testButton.textContent = originalText
		}, 2000)
	} catch (error) {
        console.clear()
		console.log(`%cScript not found Submissions/${exerciseItem.solution.folder}/${scriptFile}`, 'color: orange; font-weight: bold; font-size: 1.2em;')

		// Reset the button text in case of error
		testButton.textContent = originalText
    }
}

function renderSidebar(items) {
	const elSidebar = document.querySelector('.sidebar-items')
	const sidebarHtml = buildSideBar(items)
	elSidebar.innerHTML = sidebarHtml
}

function buildSideBar(items) {
	let strHtml = ''

	items.forEach(entry => {
		if (entry.items) {
			const res = buildSideBar(entry.items)
			strHtml += `
                <details>
                    <summary>${entry.label}</summary>
                    <nav>${res}</nav>
                </details>`
		} else {
			// Create a unique ID for the exercise based on its folder and first file
			const exId = `${entry.ex.folder}/${entry.ex.files[0].split('.')[0]}`
			strHtml += `
                <a class="sidebar-item" data-ex-path="${exId}" onclick="onLoadItem(event, '${exId}')" href="#${exId}">${entry.label}</a>`
		}
	})
	return strHtml
}

// Global function to handle sidebar item clicks
window.onLoadItem = function (ev, exPath) {
	ev.preventDefault()

	loadMarkdownContent(exPath)
	updateActiveNavItem(exPath)

	// Update browser history
	const state = { exPath }
	const url = `#${exPath}`
	history.pushState(state, '', url)

	// Update current exercise and button states
	currentExercise = exPath
	updateRunButton(exPath)
}

// Function to update the Run button state
function updateRunButton(exPath) {
	const runButton = document.getElementById('run-button')
	const testButton = document.getElementById('test-button')
	const copyButton = document.getElementById('copy-button')

	// Find the current exercise in the TOC
	const exerciseItem = findExerciseInToc(exPath)

	// Enable/disable the Run button based on whether the solution property exists and has files
	const hasScript = exerciseItem && exerciseItem.solution && exerciseItem.solution.files && exerciseItem.solution.files.length > 0
	runButton.disabled = !hasScript
	testButton.disabled = !hasScript

	// Enable the Copy button if we have a valid exercise (regardless of script availability)
	copyButton.disabled = !exerciseItem

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

// Function to find an exercise in the TOC by its path
function findExerciseInToc(exPath) {
	// Flatten the TOC to make it easier to search
	const flattenedToc = flattenToc(toc.sidebar)

	// Find the exercise with the matching path
	// The exPath is now in the format 'folder/filename-without-extension'
	return flattenedToc.find(item => {
		if (!item.ex || !item.ex.folder || !item.ex.files || !item.ex.files.length) {
			return false
		}

		// Create the ID in the same format as in buildSideBar
		const exId = `${item.ex.folder}/${item.ex.files[0].split('.')[0]}`
		return exId === exPath
	})
}

// Function to flatten the TOC structure
function flattenToc(items) {
	let result = []

	items.forEach(item => {
		if (item.items) {
			result = result.concat(flattenToc(item.items))
		} else {
			result.push(item)
		}
	})

	return result
}

// Function to load and execute a JavaScript file
function loadAndExecuteScript() {
	// Clear the console first
	console.clear()

	// Find the current exercise in the TOC
	const exerciseItem = findExerciseInToc(currentExercise)

	// If no solution property exists or no files in the solution, show an error message
	if (!exerciseItem || !exerciseItem.solution || !exerciseItem.solution.files || !exerciseItem.solution.files.length) {
		console.error('No script available for this exercise')
		return
	}

	// Get the first file from the files array (which should be the JS file)
	const scriptFile = exerciseItem.solution.files[0]

	// Get or create the script element
	let script = document.getElementById('exercise-script')
	const scriptSrc = `../../Submissions/${exerciseItem.solution.folder}/${scriptFile}`

	if (script) {
		// If the script element already exists, we need to:
		// 1. Remove it from the DOM
		// 2. Create a new one with the same ID
		// This is because simply changing the src doesn't trigger the browser to load and execute the new script
		script.remove()
	}

	// Create a new script element
	script = document.createElement('script')
	script.id = 'exercise-script'
	script.src = scriptSrc

	// Add error handling for the script
	script.onerror = () => {
		console.clear()
		console.log(`%cScript not found: \nSubmissions/${exerciseItem.solution.folder}/${scriptFile}`, 'color: orange; font-weight: bold; font-size: 1.2em;')
	}

	// // Add load event handler to confirm successful loading
	// script.onload = () => {
	// 	console.log(`Successfully loaded and executed: ${exerciseItem.solution.folder}/${scriptFile}`)
	// }

	// Add the script to the document to execute it
	document.body.appendChild(script)
}

// Function to load and render markdown content
async function loadMarkdownContent(exPath, showLoading = true) {
	const contentElement = document.getElementById('markdown-content')

	// Show loading indicator if requested
	if (showLoading) {
		contentElement.innerHTML = '<p>Loading...</p>'
	}

	try {
		// Find the exercise in the TOC to get the markdown file path
		const exerciseItem = findExerciseInToc(exPath)

		if (!exerciseItem || !exerciseItem.ex || !exerciseItem.ex.folder || !exerciseItem.ex.files || !exerciseItem.ex.files.length) {
			throw new Error(`Exercise not found or missing required properties: ${exPath}`)
		}

		// Get the folder and first file from the ex property
		const { folder, files } = exerciseItem.ex
		const mdFile = files[0]

		// Construct the path to the markdown file
		const mdPath = `../../exercises/${folder}/${mdFile}`

		const response = await fetch(mdPath)

		if (!response.ok) {
			throw new Error(`Failed to load ${mdPath}: ${response.status} ${response.statusText}`)
		}

		const mdContent = await response.text()

		// Render the markdown content
		contentElement.innerHTML = md.render(mdContent)
	} catch (error) {
		console.error('Error loading markdown content:', error)
		contentElement.innerHTML = `<p>Error loading content: ${error.message}</p>`
	}
}

// Function to update the active navigation item
function updateActiveNavItem(exPath) {
	// Remove active class from previous item
	if (currentActiveItem) {
		currentActiveItem.classList.remove('active')
	}

	// Find and add active class to current item
	const navItem = document.querySelector(`a.sidebar-item[data-ex-path="${exPath}"]`)
	if (navItem) {
		navItem.classList.add('active')
		currentActiveItem = navItem

		// Open the parent details element if it exists
		const parentDetails = navItem.closest('details')
		if (parentDetails) {
			parentDetails.open = true
		}
	}

	// Update current exercise and button states
	currentExercise = exPath
	updateRunButton(exPath)
}
