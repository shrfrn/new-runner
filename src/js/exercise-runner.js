import toc from '../../exercises/toc.js'
import md from './markdown-it-wrapper.js'
import { loadConfig, saveConfig } from './services/config.service.js'

// Initialize global state object
const state = {
	currentActiveItem: null,
	currentExercise: null,
	flattenedToc: null,
	isLoading: false,
	lastError: null,
	settings: null
}

document.addEventListener('DOMContentLoaded', init)

function init() {
	// Load user settings
	state.settings = loadConfig()
	
	// Flatten the TOC once for future use
	state.flattenedToc = flattenToc(toc.sidebar)
	
	renderSidebar(toc.sidebar)

	setupRunButton()
	setupTestButton()
	setupCopyButton()

	// Handle popstate events for browser back/forward navigation
	window.addEventListener('popstate', event => {
		if (event.state) {
            if (event.state.type === 'html') {
                // For HTML content
                const htmlItem = document.querySelector(`a.sidebar-item[data-type="html"][data-item-id="${event.state.id}"]`)
                if (htmlItem) {
                    // Simulate a click on the sidebar item
                    htmlItem.click()
                } else {
                    // Fallback to loading by folder/file if item not found
                    loadHtmlContent(event.state.folder, event.state.file)
                }
            } else if (event.state.id) {
                // For markdown content
                loadMarkdownContent(event.state.id, false)
                updateActiveNavItem(event.state.id)
            }
		}
	})

	// Check if there's a hash in the URL to load specific content on page load
	const hash = window.location.hash.substring(1)
	if (hash) {
		// First try to find any sidebar item with this ID
        const sidebarItem = document.querySelector(`a.sidebar-item[data-item-id="${hash}"]`)
        if (sidebarItem) {
            // Simulate a click on the sidebar item
            sidebarItem.click()
        } else {
            // If no direct match, check if it's a legacy path format (folder/file)
            if (hash.includes('/')) {
                // Extract folder and file from the hash
                const pathParts = hash.split('/')
                // The last part is the file
                const file = pathParts.pop()
                // The rest is the folder path
                const folder = pathParts.join('/')
                
                // Try to find the HTML item by folder/file
                const htmlItem = document.querySelector(`a.sidebar-item[data-type="html"][data-doc-folder="${folder}"][data-doc-file="${file}"]`)
                if (htmlItem) {
                    // Simulate a click on the sidebar item
                    htmlItem.click()
                } else {
                    // Try to load the HTML file directly
                    loadHtmlContent(folder, file, false)
                }
            } else {
                // Try to parse the hash as an integer to use as ID for markdown content
                const id = parseInt(hash, 10)
                if (!isNaN(id)) {
                    loadMarkdownContent(id, false)
                    updateActiveNavItem(id)
                }
            }
        }
	} else {
		// No hash in URL, use the last entry ID from settings
		const lastEntryId = state.settings.lastEntryId
		if (lastEntryId) {
			// Find and programmatically click the sidebar item using data-item-id
			const sidebarItem = document.querySelector(`a.sidebar-item[data-item-id="${lastEntryId}"]`)
			if (sidebarItem) {
				// Simulate a click on the sidebar item
				sidebarItem.click()
			} else {
				// Fallback if sidebar item not found - try as number for backward compatibility
				const numberId = parseInt(lastEntryId, 10)
				if (!isNaN(numberId)) {
					loadMarkdownContent(numberId, false)
					updateActiveNavItem(numberId)
				}
			}
		}
	}
}

// Set up the Run button functionality
function setupRunButton() {
	const runButton = document.getElementById('run-button')

	runButton.addEventListener('click', () => {
		if (!state.currentExercise) return

		// Load and execute the corresponding JavaScript file from the submissions folder
		loadAndExecuteScript()
	})
}

// Set up the Test button functionality
function setupTestButton() {
	const testButton = document.getElementById('test-button')

	testButton.addEventListener('click', () => {
		if (!state.currentExercise) return
		sendScriptToServer()
	})
}

// Set up the Copy button functionality
function setupCopyButton() {
	const copyButton = document.getElementById('copy-button')

	copyButton.addEventListener('click', async () => {
		if (!state.currentExercise) return
		await copyExerciseAsComments()
	})
}

// Button state management helpers
function setButtonState(runEnabled, testEnabled, copyEnabled) {
	document.getElementById('run-button').disabled = !runEnabled
	document.getElementById('test-button').disabled = !testEnabled
	document.getElementById('copy-button').disabled = !copyEnabled
}

function enableAllButtons() {
	setButtonState(true, true, true)
}

function disableAllButtons() {
	setButtonState(false, false, false)
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
    // Use the flattened TOC from state
    const exerciseItem = state.flattenedToc.find(item => item.id === state.currentExercise)
    
    if (!exerciseItem) {
        console.error('Exercise not found')
        return
    }

    // Get the first file from the files array (which should be the JS file)
    const scriptFile = exerciseItem.solution.files[0]
    
    // Create a URL object to properly resolve the path
    const scriptUrl = new URL(`../../submissions/${exerciseItem.solution.folder}/${scriptFile}`, window.location.href)
    const scriptSrc = scriptUrl.href

    // Get the test button to update its text
    const testButton = document.getElementById('test-button')
    const originalText = testButton.textContent

    try {
        // Set loading state
        state.isLoading = true
        // Update button text to show submission is in progress
        testButton.textContent = 'Submitting...'

        // First verify the script exists
        const scriptResponse = await fetch(scriptSrc)
        if (!scriptResponse.ok) {
            throw new Error(`Script not found: ${scriptSrc}`)
        }

        // Get the script content as text
        const scriptContent = await scriptResponse.text()

        // Create a File object from the script content
        const file = new File([scriptContent], scriptFile, { type: 'text/javascript' })

        // Create a FormData object and append the file and exerciseId
        const formData = new FormData()
        formData.append('file', file)
        formData.append('exerciseId', exerciseItem.id.toString())
        
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
            state.isLoading = false
        }, 2000)
    } catch (error) {
        // console.clear()
        console.log(`%c${error.message}`, 'color: orange; font-weight: bold; font-size: 1.2em;')

        // Record the error in state
        state.lastError = error.message
        
        // Reset the button text in case of error
        testButton.textContent = originalText
        state.isLoading = false
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
		} else if (entry.type === 'html') {
            // Handle HTML type items
            // If folder is missing, use empty string instead of 'html'
            // This ensures the path is constructed correctly in loadHtmlContent
            const folder = entry.doc.folder || ''
            const file = entry.doc.file
            
            strHtml += `
                <a class="sidebar-item" data-type="html" data-item-id="${entry.id}" data-doc-folder="${folder}" data-doc-file="${file}" onclick="onLoadItem(event)" href="#${entry.id}">${entry.label}</a>`
        } else {
			// Handle markdown type items
			const exPath = `${entry.ex.folder}/${entry.ex.files[0].split('.')[0]}`
			
			strHtml += `
                <a class="sidebar-item" data-type="ex-markdown" data-item-id="${entry.id}" data-ex-id="${entry.id}" data-ex-path="${exPath}" onclick="onLoadItem(event, ${entry.id})" href="#${entry.id}">${entry.label}</a>`
		}
	})
	return strHtml
}

// Global function to handle sidebar item clicks
window.onLoadItem = function (ev, id) {
	ev.preventDefault()

	// Get the element that was clicked
	const clickedEl = ev.currentTarget
	const itemType = clickedEl.getAttribute('data-type')
    const itemId = clickedEl.getAttribute('data-item-id')
    
    if (itemType === 'html') {
        // For HTML items, load the HTML content
        const folder = clickedEl.getAttribute('data-doc-folder')
        const file = clickedEl.getAttribute('data-doc-file')
        loadHtmlContent(folder, file)
        
        // Update active class
        if (state.currentActiveItem) {
            state.currentActiveItem.classList.remove('active')
        }
        clickedEl.classList.add('active')
        state.currentActiveItem = clickedEl
        
        // Update browser history with ID
        const historyState = { type: 'html', id: itemId, folder, file }
        const url = `#${itemId}`
        history.pushState(historyState, '', url)
        
        // Disable all buttons for HTML content
        disableAllButtons()
        
        // Open the parent details element if it exists
        const parentDetails = clickedEl.closest('details')
        if (parentDetails) {
            parentDetails.open = true
        }
        
        // Save the current item ID to settings
        state.settings.lastEntryId = itemId
        saveConfig(state.settings)
        
        return
    }
    
    // For markdown items, proceed with the existing logic
	const exPath = clickedEl.getAttribute('data-ex-path')

	loadMarkdownContent(id)
	updateActiveNavItem(id)

	// Update browser history
	const historyState = { id }
	const url = `#${id}`
	history.pushState(historyState, '', url)

	// Update current exercise and button states
	state.currentExercise = id
	updateRunButton(id)
	
	// Save the current exercise ID to settings
	state.settings.lastEntryId = id
	saveConfig(state.settings)
}

// Function to update the Run button state
function updateRunButton(id) {
	const exerciseItem = state.flattenedToc.find(item => item.id === id)
	const hasScript = exerciseItem && exerciseItem.solution && exerciseItem.solution.files && exerciseItem.solution.files.length > 0

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

// Function to flatten the TOC structure
function flattenToc(items) {
	let result = []

	items.forEach(item => {
		if (item.items) {
			result = result.concat(flattenToc(item.items))
		} else {
            // Include all item types in the flattened TOC
			result.push(item)
		}
	})

	return result
}

// Function to load and execute a JavaScript file
function loadAndExecuteScript() {
	// Clear the console first
	// console.clear()

	// Use the flattened TOC from state
	const exerciseItem = state.flattenedToc.find(item => item.id === state.currentExercise)

	// If no solution property exists or no files in the solution, show an error message
	if (!exerciseItem || !exerciseItem.solution || !exerciseItem.solution.files || !exerciseItem.solution.files.length) {
		console.error('No script available for this exercise')
		state.lastError = 'No script available for this exercise'
		return
	}

	// Get the first file from the files array (which should be the JS file)
	const scriptFile = exerciseItem.solution.files[0]

	// Get or create the script element
	let script = document.getElementById('exercise-script')
	const scriptSrc = `../../submissions/${exerciseItem.solution.folder}/${scriptFile}`

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
		const errorMsg = `Script not found: \nsubmissions/${exerciseItem.solution.folder}/${scriptFile}`
		console.log(`%c${errorMsg}`, 'color: orange; font-weight: bold; font-size: 1.2em;')
		state.lastError = errorMsg
	}

	// Add the script to the document to execute it
	document.body.appendChild(script)
}

// Function to load and render markdown content
async function loadMarkdownContent(id, showLoading = true) {
	const contentElement = document.getElementById('markdown-content')

	// Show loading indicator if requested
	if (showLoading) {
		contentElement.innerHTML = '<p>Loading...</p>'
		state.isLoading = true
	}

	try {
		// Find the exercise in the TOC using the id
		const exerciseItem = state.flattenedToc.find(item => item.id === id)

		if (!exerciseItem || !exerciseItem.ex || !exerciseItem.ex.folder || !exerciseItem.ex.files || !exerciseItem.ex.files.length) {
			throw new Error(`Exercise not found or missing required properties for ID: ${id}`)
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
		state.isLoading = false
	} catch (error) {
		console.error('Error loading markdown content:', error)
		contentElement.innerHTML = `<p>Error loading content: ${error.message}</p>`
		state.lastError = error.message
		state.isLoading = false
	}
}

// Function to update the active navigation item
function updateActiveNavItem(id) {
	// Remove active class from previous item
	if (state.currentActiveItem) {
		state.currentActiveItem.classList.remove('active')
	}

	// Find and add active class to current item - check both data-ex-id and data-item-id
	const navItem = document.querySelector(`a.sidebar-item[data-item-id="${id}"]`)
	if (navItem) {
		navItem.classList.add('active')
		state.currentActiveItem = navItem

		// Open the parent details element if it exists
		const parentDetails = navItem.closest('details')
		if (parentDetails) {
			parentDetails.open = true
		}
		
		// Check if this is a markdown item
		const itemType = navItem.getAttribute('data-type')
		if (itemType === 'ex-markdown') {
			// Update current exercise and button states
			state.currentExercise = id
			updateRunButton(id)
			
			// Auto-run the script if the autoRun setting is enabled
			if (state.settings.autoRun) {
				const exerciseItem = state.flattenedToc.find(item => item.id === id)
				const hasScript = exerciseItem && exerciseItem.solution && exerciseItem.solution.files && exerciseItem.solution.files.length > 0
				
				if (hasScript) {
					// Use a small delay to ensure the UI is updated first
					setTimeout(() => {
						loadAndExecuteScript()
					}, 100)
				}
			}
		} else {
			// For HTML items, disable all buttons
			disableAllButtons()
		}
	}
}

// Function to load HTML content
async function loadHtmlContent(folder, file, showLoading = true) {
    const contentElement = document.getElementById('markdown-content')
    
    // Show loading indicator if requested
    if (showLoading) {
        contentElement.innerHTML = '<p>Loading...</p>'
        state.isLoading = true
    }
    
    try {
        // Construct the path to the HTML file
        // Handle different folder scenarios
        let basePath
        if (folder === '.') {
            // If folder is '.', use the html folder directly
            basePath = '../../html/'
        } else if (!folder || folder === 'html') {
            // If folder is missing or explicitly 'html', use html folder directly
            basePath = '../../html/'
        } else {
            // Otherwise, append folder to html path
            basePath = `../../html/${folder}/`
        }
        
        const htmlPath = `${basePath}${file}`
        
        const response = await fetch(htmlPath)
        
        if (!response.ok) {
            throw new Error(`Failed to load ${htmlPath}: ${response.status} ${response.statusText}`)
        }
        
        const htmlContent = await response.text()
        
        // Create a container div to hold the HTML content
        contentElement.innerHTML = `<div class="html-content">${htmlContent}</div>`
        
        // Extract any scripts from the HTML content and execute them
        const container = contentElement.querySelector('.html-content')
        const scripts = container.querySelectorAll('script')
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script')
            
            // Copy all attributes from the old script to the new one
            Array.from(oldScript.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value)
            })
            
            // Copy the content of the script
            newScript.textContent = oldScript.textContent
            
            // Replace the old script with the new one
            oldScript.parentNode.replaceChild(newScript, oldScript)
        })
        
        state.isLoading = false
    } catch (error) {
        console.error('Error loading HTML content:', error)
        contentElement.innerHTML = `<p>Error loading content: ${error.message}</p>`
        state.lastError = error.message
        state.isLoading = false
    }
}
