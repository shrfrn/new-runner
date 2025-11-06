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
		} else if (entry.type === 'html') {
			const folder = entry.doc.folder || ''
			const file = entry.doc.file

			html += `<a 
                        class="sidebar-item" 
                        data-type="html" 
                        data-item-id="${entry.id}" 
                        data-doc-folder="${folder}" 
                        data-doc-file="${file}" 
                        onclick="onLoadItem(event)" 
                        href="#${entry.id}">${entry.label}</a>`
		} else {
			const exPath = `${entry.ex.folder}/${entry.ex.files[0].split('.')[0]}`

			html += `<a 
                        class="sidebar-item" 
                        data-type="ex-markdown" 
                        data-item-id="${entry.id}" 
                        data-ex-id="${entry.id}" 
                        data-ex-path="${exPath}" 
                        onclick="onLoadItem(event, ${entry.id})" 
                        href="#${entry.id}">${entry.label}</a>`
		}
	})

	return html
}

export function renderSidebar(items) {
	const sidebar = document.querySelector('.sidebar-items')
	const sidebarHtml = buildSidebar(items)

	sidebar.innerHTML = sidebarHtml
}

function updateSidebar(selector, currentActiveItem, includeItemType = false) {
	if (currentActiveItem) currentActiveItem.classList.remove('active')

	const navItem = document.querySelector(selector)
	if (!navItem) {
		return includeItemType 
			? { currentActiveItem: null, itemType: null }
			: { currentActiveItem: null }
	}

	navItem.classList.add('active')

	const parentDetails = navItem.closest('details')
	if (parentDetails) parentDetails.open = true

	const result = { currentActiveItem: navItem }
	if (includeItemType) result.itemType = navItem.getAttribute('data-type')

	return result
}

export function updateActiveMarkdownItem(id, currentActiveItem) {
	return updateSidebar(`a.sidebar-item[data-item-id="${id}"]`, currentActiveItem, true)
}

export function updateActiveHtmlItem(folder, file, currentActiveItem) {
	return updateSidebar(`a.sidebar-item[data-type="html"][data-doc-folder="${folder}"][data-doc-file="${file}"]`, currentActiveItem)
}

