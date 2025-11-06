import md from './markdown-it-wrapper.js'

export async function loadMarkdownContent(id, flattenedToc, showLoading = true) {
	const contentElement = document.getElementById('markdown-content')

	if (showLoading) contentElement.innerHTML = '<p>Loading...</p>'

	try {
		const exerciseItem = flattenedToc.find(item => item.id === id)

		if (!exerciseItem?.content?.folder || !exerciseItem.content.files?.length) {
			throw new Error(`Exercise not found or missing required properties for ID: ${id}`)
		}

		const { folder, files } = exerciseItem.content
		const mdFile = files[0]
		const mdPath = `../../exercises/${folder}/${mdFile}`

		const response = await fetch(mdPath)

		if (!response.ok) {
			throw new Error(`Failed to load ${mdPath}: ${response.status} ${response.statusText}`)
		}

		const mdContent = await response.text()
		contentElement.innerHTML = md.render(mdContent)

		return { success: true }
	} catch (error) {
		console.error('Error loading markdown content:', error)
		contentElement.innerHTML = `<p>Error loading content: ${error.message}</p>`
		
		return { success: false, error: error.message }
	}
}

export async function loadHtmlContent(folder, file, showLoading = true) {
	const contentElement = document.getElementById('markdown-content')

	if (showLoading) contentElement.innerHTML = '<p>Loading...</p>'

	try {
		let basePath

		if (folder === '.') {
			basePath = '../../html/'
		} else if (!folder || folder === 'html') {
			basePath = '../../html/'
		} else {
			basePath = `../../html/${folder}/`
		}

		const htmlPath = `${basePath}${file}`
		const response = await fetch(htmlPath)

		if (!response.ok) {
			throw new Error(`Failed to load ${htmlPath}: ${response.status} ${response.statusText}`)
		}

		const htmlContent = await response.text()
		contentElement.innerHTML = `<div class="html-content">${htmlContent}</div>`

		const container = contentElement.querySelector('.html-content')
		const scripts = container.querySelectorAll('script')

		scripts.forEach(oldScript => {
			const newScript = document.createElement('script')

			Array.from(oldScript.attributes)
                .forEach(attr => newScript.setAttribute(attr.name, attr.value))

			newScript.textContent = oldScript.textContent
			oldScript.parentNode.replaceChild(newScript, oldScript)
		})

		return { success: true }
	} catch (error) {
		console.error('Error loading HTML content:', error)
		contentElement.innerHTML = `<p>Error loading content: ${error.message}</p>`
		
		return { success: false, error: error.message }
	}
}

