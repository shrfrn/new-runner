import toc from '../content/toc.js'
import { loadConfig, saveConfig } from './services/config.service.js'
import { logExerciseRun } from './services/usage-tracking.service.js'
import { loadMarkdownContent, loadHtmlContent } from './content-loader.js'
import { loadAndExecuteScript } from './script-runner.js'
import { sendScriptToServer } from './test-submission.js'
import {
	setupButtons,
	updateRunButton,
	copyExerciseAsComments,
	disableAllButtons,
	setAuthButtonToSignIn,
	setAuthButtonToSignOut,
} from './ui.js'
import { flattenToc, renderSidebar, updateActiveSidebarItem } from './sidebar.js'
import { setupPopstateListener, handleInitialRoute, pushHistoryState } from './router.js'
import { getLoggedinUser, logout } from './services/auth.service.js'
import { initAuthPage } from './pages/auth-page.js'

const state = {
	currentActiveItem: null,
	currentExercise: null,
	flattenedToc: null,
	settings: null,
	currentUser: null,
	authPage: null,
}

document.addEventListener('DOMContentLoaded', init)

function init() {
	state.settings = loadConfig()
	state.flattenedToc = flattenToc(toc.sidebar)
	state.currentUser = getLoggedinUser()

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
		if (!state.currentUser) {
			alert('You must sign in to run tests')
			return
		}
		sendScriptToServer(state.currentExercise, state.flattenedToc)
	}

	async function handleCopy() {
		if (!state.currentExercise) return
		await copyExerciseAsComments()
	}

	async function onNavigateAuth(event) {
		if (event) event.preventDefault()
		await handleItem('auth')
	}

	async function onLogoutClick(event) {
		if (event) event.preventDefault()

		const didLogout = await logout()
		if (!didLogout) {
			console.error('Failed to log out user')
			return
		}

		state.currentUser = null
		setAuthButtonToSignIn()
	}

	setupButtons(handleRun, handleTest, handleCopy, onNavigateAuth, onLogoutClick)

	if (state.currentUser) {
		setAuthButtonToSignOut(getDisplayName(state.currentUser))
	} else {
		setAuthButtonToSignIn()
	}
	window.onLoadItem = onLoadItem
}

async function loadItem(id) {
	const item = state.flattenedToc.find(i => i.id === id)
	if (!item) return

	if (item.type === 'html') {
		const folder = item.content.folder || ''
		const file = item.content.files[0]
		const htmlResult = await loadHtmlContent(folder, file)

		if (id === 'auth' && htmlResult?.container) {
			state.authPage = initAuthPage({
				container: htmlResult.container,
				onSuccess: onAuthSuccess,
			})
		} else {
			state.authPage = null
		}
		
		const sidebarUpdate = updateActiveSidebarItem(id, state.currentActiveItem)
		state.currentActiveItem = sidebarUpdate.currentActiveItem
		
		disableAllButtons()
		state.currentExercise = null
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

async function onLoadItem(ev, id) {
	ev.preventDefault()

	const clickedEl = ev.currentTarget
	const itemId = clickedEl.getAttribute('data-item-id')

	await handleItem(id || itemId)
}

async function handleItem(id) {
 	await loadItem(id)

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

function onAuthSuccess(user) {
	if (!user) return

	state.currentUser = user
	setAuthButtonToSignOut(getDisplayName(user))
}

function getDisplayName(user) {
	if (!user || typeof user !== 'object') return ''

	if (user.fullname) return user.fullname
	if (user.name) return user.name
	if (user.email) return user.email
	if (user.username) return user.username

	return ''
}
