import toc from '../../exercises/toc.js'
import { loadConfig, saveConfig } from './services/config.service.js'
import { loadMarkdownContent, loadHtmlContent } from './content-loader.js'
import { loadAndExecuteScript } from './script-runner.js'
import { sendScriptToServer } from './test-submission.js'
import { setupButtons, updateRunButton, copyExerciseAsComments, disableAllButtons } from './ui.js'
import { flattenToc, renderSidebar, updateActiveNavItem } from './sidebar.js'
import { setupPopstateListener, handleInitialRoute, pushHistoryState } from './router.js'

const state = {
	currentActiveItem: null,
	currentExercise: null,
	flattenedToc: null,
	settings: null,
}

document.addEventListener('DOMContentLoaded', init)

function init() {
	state.settings = loadConfig()
	state.flattenedToc = flattenToc(toc.sidebar)

	renderSidebar(toc.sidebar)
	setupEventHandlers()
	setupRouting()
}

function setupEventHandlers() {
	function handleRun() {
		if (!state.currentExercise) return
		loadAndExecuteScript(state.currentExercise, state.flattenedToc)
	}

	function handleTest() {
		if (!state.currentExercise) return
		sendScriptToServer(state.currentExercise, state.flattenedToc)
	}

	async function handleCopy() {
		if (!state.currentExercise) return
		await copyExerciseAsComments()
	}

	setupButtons(handleRun, handleTest, handleCopy)
	window.onLoadItem = onLoadItem
}

function setupRouting() {
	setupPopstateListener(
		(folder, file) => loadHtmlContent(folder, file),
		(id, addToHistory) => {
			loadMarkdownContent(id, state.flattenedToc, false)
			updateActiveItem(id)
		}
	)

	handleInitialRoute(state.settings, (id) => {
		loadMarkdownContent(id, state.flattenedToc, false)
		updateActiveItem(id)
	})
}

function onLoadItem(ev, id) {
	ev.preventDefault()

	const clickedEl = ev.currentTarget
	const itemType = clickedEl.getAttribute('data-type')
	const itemId = clickedEl.getAttribute('data-item-id')

	if (itemType === 'html') handleHtmlItem(clickedEl, itemId)
	else if (itemType === 'ex-markdown') handleMarkdownItem(id)
}

function handleHtmlItem(clickedEl, itemId) {
	const folder = clickedEl.getAttribute('data-doc-folder')
	const file = clickedEl.getAttribute('data-doc-file')

	loadHtmlContent(folder, file)

	if (state.currentActiveItem) {
		state.currentActiveItem.classList.remove('active')
	}

	clickedEl.classList.add('active')
	state.currentActiveItem = clickedEl

	pushHistoryState('html', itemId, folder, file)
	disableAllButtons()

	const parentDetails = clickedEl.closest('details')
	if (parentDetails) parentDetails.open = true

	state.settings.lastEntryId = itemId
	saveConfig(state.settings)
}

function updateActiveItem(id) {
	const result = updateActiveNavItem(id, state.currentActiveItem)
	state.currentActiveItem = result.currentActiveItem

	if (result.itemType === 'ex-markdown' && state.settings.autoRun) {
		const exerciseItem = state.flattenedToc.find(item => item.id === id)
		const hasScript = exerciseItem?.solution?.files?.length > 0

		if (hasScript) {
			setTimeout(() => loadAndExecuteScript(state.currentExercise, state.flattenedToc), 100)
		}
	}
}

function handleMarkdownItem(id) {
	loadMarkdownContent(id, state.flattenedToc)
	updateActiveItem(id)

	pushHistoryState('markdown', id)

	state.currentExercise = id
	updateRunButton(id, state.flattenedToc)

	state.settings.lastEntryId = id
	saveConfig(state.settings)
}
