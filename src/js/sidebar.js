export function flattenToc(items) {
	let result = []

	items.forEach(item => {
		if (item.items) result = result.concat(flattenToc(item.items))
		else result.push(item)
	})

	return result
}

export function buildSidebar(items) {
	let html = ''

	items.forEach(entry => {
		if (entry.items) {
			const res = buildSidebar(entry.items)
			html += `
                <details>
                    <summary>${entry.label}</summary>
                    <nav>${res}</nav>
                </details>`
		} else if (entry.content) {
			const folder = entry.content.folder || ''
			const file = entry.content.files[0]
			const isHtml = entry.type === 'html'

			html += `<a 
                        class="sidebar-item" 
                        data-type="${entry.type}" 
                        data-item-id="${entry.id}" 
                        data-content-folder="${folder}" 
                        data-content-file="${file}" 
                        onclick="onLoadItem(event${isHtml ? '' : ', ' + entry.id})" 
                        href="#${entry.id}">${entry.label}</a>`
		}
	})

	return html
}

export function renderSidebar(items) {
	const elSidebar = document.querySelector('.sidebar-items')
	const sidebarHtml = buildSidebar(items)

	elSidebar.innerHTML = sidebarHtml
}

function updateSidebar(selector, currentActiveItem, includeItemType = false) {
	if (currentActiveItem) currentActiveItem.classList.remove('active')

	const elNavItem = document.querySelector(selector)
	if (!elNavItem) {
		return includeItemType 
			? { currentActiveItem: null, itemType: null }
			: { currentActiveItem: null }
	}

	elNavItem.classList.add('active')

	const parentDetails = elNavItem.closest('details')
	if (parentDetails) parentDetails.open = true

	const result = { currentActiveItem: elNavItem }
	if (includeItemType) result.itemType = elNavItem.getAttribute('data-type')

	return result
}

export function updateActiveSidebarItem(id, currentActiveItem) {
	return updateSidebar(`a.sidebar-item[data-item-id="${id}"]`, currentActiveItem, true)
}

