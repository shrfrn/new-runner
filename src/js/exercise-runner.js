import toc from '../content/toc.js'
import { loadConfig, saveConfig } from './services/config.service.js'
import { logExerciseRun } from './services/usage-tracking.service.js'
import { loadMarkdownContent, loadHtmlContent } from './content-loader.js'
import { loadAndExecuteScript } from './script-runner.js'
import { sendScriptToServer } from './test-submission.js'
import { setupButtons, updateRunButton, copyExerciseAsComments, disableAllButtons } from './ui.js'
import { flattenToc, renderSidebar, updateActiveSidebarItem } from './sidebar.js'
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

		logExerciseRun(state.currentExercise)
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

function loadItem(id) {
	const item = state.flattenedToc.find(i => i.id === id)
	if (!item) return

	if (item.type === 'html') {
		const folder = item.content.folder || ''
		const file = item.content.files[0]
		loadHtmlContent(folder, file)
		
		const result = updateActiveSidebarItem(id, state.currentActiveItem)
		state.currentActiveItem = result.currentActiveItem
		
		disableAllButtons()
	} else if (item.type === 'ex-markdown') {
		loadMarkdownContent(id, state.flattenedToc, false)
		updateActiveItem(id)
		
		state.currentExercise = id
		updateRunButton(id, state.flattenedToc)
	}
}

function setupRouting() {
	setupPopstateListener(loadItem)
	handleInitialRoute(state.settings, loadItem)
}

function onLoadItem(ev, id) {
	ev.preventDefault()

	const clickedEl = ev.currentTarget
	const itemId = clickedEl.getAttribute('data-item-id')

	handleItem(id || itemId)
}

function handleItem(id) {
	loadItem(id)

	pushHistoryState(id)
	
	state.settings.lastEntryId = id
	saveConfig(state.settings)
}

function updateActiveItem(id) {
	const result = updateActiveSidebarItem(id, state.currentActiveItem)
	state.currentActiveItem = result.currentActiveItem

	if (result.itemType === 'ex-markdown' && state.settings.autoRun) {
		const exerciseItem = state.flattenedToc.find(item => item.id === id)
		const hasScript = exerciseItem?.solution?.files?.length > 0

		if (hasScript) {
			setTimeout(() => loadAndExecuteScript(state.currentExercise, state.flattenedToc), 100)
		}
	}
}
