import md from './markdown-it-wrapper.js'

export async function loadMarkdownContent(id, flattenedToc, showLoading = true) {
	const elContent = document.getElementById('markdown-content')

	if (showLoading) elContent.innerHTML = '<p>Loading...</p>'

	try {
		const exerciseItem = flattenedToc.find(item => item.id === id)

		if (!exerciseItem?.content?.folder || !exerciseItem.content.files?.length) {
			throw new Error(`Exercise not found or missing required properties for ID: ${id}`)
		}

	const { folder, files } = exerciseItem.content
	const mdFile = files[0]
	const mdPath = `content/${folder}/${mdFile}`

		const response = await fetch(mdPath)

		if (!response.ok) {
			throw new Error(`Failed to load ${mdPath}: ${response.status} ${response.statusText}`)
		}

		const mdContent = await response.text()
		elContent.innerHTML = md.render(mdContent)

		return { success: true }
	} catch (error) {
		console.error('Error loading markdown content:', error)
		elContent.innerHTML = `<p>Error loading content: ${error.message}</p>`
		
		return { success: false, error: error.message }
	}
}

export async function loadHtmlContent(folder, file, showLoading = true) {
	const elContent = document.getElementById('markdown-content')

	if (showLoading) elContent.innerHTML = '<p>Loading...</p>'

	try {
		let basePath

		if (folder === '.') {
			basePath = 'content/html/'
		} else if (!folder || folder === 'html') {
			basePath = 'content/html/'
		} else {
			basePath = `content/html/${folder}/`
		}

		const htmlPath = `${basePath}${file}`
		const response = await fetch(htmlPath)

		if (!response.ok) {
			throw new Error(`Failed to load ${htmlPath}: ${response.status} ${response.statusText}`)
		}

		const htmlContent = await response.text()
		elContent.innerHTML = `<div class="html-content">${htmlContent}</div>`

		const elContainer = elContent.querySelector('.html-content')
		if (!elContainer) {
			return { success: false, error: 'Failed to render content container.', container: null }
		}

		const elScripts = elContainer.querySelectorAll('script')

		elScripts.forEach(elOldScript => {
			const elNewScript = document.createElement('script')

			Array.from(elOldScript.attributes)
                .forEach(attr => elNewScript.setAttribute(attr.name, attr.value))

			elNewScript.textContent = elOldScript.textContent
			elOldScript.parentNode.replaceChild(elNewScript, elOldScript)
		})

		return { success: true, container: elContainer }
	} catch (error) {
		console.error('Error loading HTML content:', error)
		elContent.innerHTML = `<p>Error loading content: ${error.message}</p>`
		
		return { success: false, error: error.message, container: null }
	}
}

