export function setupPopstateListener(onHtmlNavigation, onMarkdownNavigation) {
	window.addEventListener('popstate', event => {
		if (!event.state) return

		if (event.state.type === 'html') {
			onHtmlNavigation(event.state.folder, event.state.file)
		} else if (event.state.id) {
			onMarkdownNavigation(event.state.id)
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
	if (sidebarItem) sidebarItem.click()
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

