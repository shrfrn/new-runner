import toc from '../../exercises/toc.js'
import md from './markdown-it-wrapper.js'

let currentActiveItem = null

document.addEventListener('DOMContentLoaded', init)

function init() {
	renderSidebar(toc.sidebar)

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
			strHtml += `
                <a class="sidebar-item" data-ex-path="${entry.ex}" onclick="onLoadItem(event, '${entry.ex}')" href="#${entry.ex}">${entry.label}</a>`
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
}

// Function to load and render markdown content
async function loadMarkdownContent(exPath, showLoading = true) {
	const contentElement = document.getElementById('markdown-content')

	// Show loading indicator if requested
	if (showLoading) {
		contentElement.innerHTML = '<p>Loading...</p>'
	}

	try {
		// The exPath now contains the correct path from the exercises folder
		// Just need to add the .md extension and the path to the exercises folder
		const mdPath = `../../exercises/${exPath}.md`
		console.log('Attempting to load:', mdPath)

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
}
