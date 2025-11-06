export function setupPopstateListener(onHtmlNavigation, onMarkdownNavigation) {
	window.addEventListener('popstate', event => {
		if (!event.state) return

		if (event.state.type === 'html') {
			const htmlItem = document.querySelector(`a.sidebar-item[data-type="html"][data-item-id="${event.state.id}"]`)

			if (htmlItem) htmlItem.click()
			else onHtmlNavigation(event.state.folder, event.state.file)

		} else if (event.state.id) {
			onMarkdownNavigation(event.state.id, false)
		}
	})
}

export function handleInitialRoute(settings, onSidebarItemClick) {
	const hash = window.location.hash.substring(1)
	if (hash) return handleHashRoute(hash)

	handleLastEntryRoute(settings, onSidebarItemClick)
}

function handleHashRoute(hash) {
	const sidebarItem = document.querySelector(`a.sidebar-item[data-item-id="${hash}"]`)

	if (sidebarItem) {
		sidebarItem.click()
		return
	}

	if (hash.includes('/')) return handleLegacyPathFormat(hash)
	handleNumericId(hash)
}

function handleLegacyPathFormat(hash) {
	const pathParts = hash.split('/')
	const file = pathParts.pop()
	const folder = pathParts.join('/')

	const htmlItem = document.querySelector(`a.sidebar-item[data-type="html"][data-doc-folder="${folder}"][data-doc-file="${file}"]`)
	if (htmlItem) htmlItem.click()
}

function handleNumericId(hash, onMarkdownLoad, onActiveItemUpdate) {
	const id = parseInt(hash, 10)

	if (!isNaN(id) && onMarkdownLoad && onActiveItemUpdate) {
		onMarkdownLoad(id, false)
		onActiveItemUpdate(id)
	}
}

function handleLastEntryRoute(settings, onSidebarItemClick) {
	const lastEntryId = settings.lastEntryId

	if (!lastEntryId) return

	const sidebarItem = document.querySelector(`a.sidebar-item[data-item-id="${lastEntryId}"]`)

	if (sidebarItem) {
		sidebarItem.click()
		return
	}

	const numberId = parseInt(lastEntryId, 10)
	if (!isNaN(numberId) && onSidebarItemClick) {
		onSidebarItemClick(numberId)
	}
}

export function pushHistoryState(type, id, folder, file) {
	const historyState = type === 'html' 
		? { type, id, folder, file }
		: { id }

	const url = `#${id}`
	history.pushState(historyState, '', url)
}

