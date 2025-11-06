export function setupPopstateListener(onNavigation) {
	window.addEventListener('popstate', event => {
		if (!event.state?.id) return
		onNavigation(event.state.id)
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

export function pushHistoryState(id) {
	history.pushState({ id }, '', `#${id}`)
}

