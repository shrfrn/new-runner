/**
 * HTTP Service
 * Centralized HTTP client for making API requests with consistent error handling
 */

// Base URL configuration
const BASE_URLS = {
	AUTH_SERVER: 'http://localhost:3000',
	TEST_SERVER: 'http://localhost:3000',
	STATIC: '', // Relative paths for static content
}

// Default configuration
const DEFAULT_CONFIG = {
	credentials: 'same-origin',
	timeout: 30000, // 30 seconds
}

/**
 * Gets the base URL for a given server identifier
 */
function getBaseUrl(identifier) {
	if (!identifier) return BASE_URLS.STATIC

	if (typeof identifier === 'string' && BASE_URLS[identifier]) {
		return BASE_URLS[identifier]
	}

	// If it's a full URL, return as-is
	if (typeof identifier === 'string' && identifier.startsWith('http')) {
		return identifier
	}

	return BASE_URLS.STATIC
}

/**
 * Creates a timeout promise that rejects after specified ms
 */
function createTimeoutPromise(ms) {
	return new Promise((_, reject) => {
		setTimeout(() => reject(new Error('Request timeout')), ms)
	})
}

/**
 * Parses response based on content type
 */
async function parseResponse(response) {
	const contentType = response.headers.get('content-type') || ''

	try {
		if (contentType.includes('application/json')) {
			return await response.json()
		}

		return await response.text()
	} catch (error) {
		throw new Error('Failed to parse response')
	}
}

/**
 * Handles HTTP errors and creates consistent error messages
 */
async function handleHttpError(response) {
	const contentType = response.headers.get('content-type') || ''
	let errorMessage = `HTTP ${response.status}: ${response.statusText}`

	// Try to extract error message from response body
	try {
		if (contentType.includes('application/json')) {
			const data = await response.json()
			if (data?.message) errorMessage = data.message
		}
	} catch {
		// If parsing fails, use default message
	}

	throw new Error(errorMessage)
}

/**
 * Core request function
 */
async function request(url, options = {}) {
	const {
		baseUrl,
		timeout = DEFAULT_CONFIG.timeout,
		credentials = DEFAULT_CONFIG.credentials,
		...fetchOptions
	} = options

	const fullUrl = `${getBaseUrl(baseUrl)}${url}`

	const finalOptions = {
		...fetchOptions,
		credentials,
	}

	try {
		const fetchPromise = fetch(fullUrl, finalOptions)
		const timeoutPromise = createTimeoutPromise(timeout)

		const response = await Promise.race([fetchPromise, timeoutPromise])

		if (!response.ok) {
			await handleHttpError(response)
		}

		return await parseResponse(response)
	} catch (error) {
		// Network errors or timeout errors
		if (error.message === 'Request timeout') {
			throw new Error('Request timeout. Please try again.')
		}

		if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
			throw new Error('Network error. Please check your connection and try again.')
		}

		// Re-throw HTTP errors and parsing errors as-is
		throw error
	}
}

/**
 * GET request
 */
export async function get(url, options = {}) {
	return request(url, {
		...options,
		method: 'GET',
	})
}

/**
 * POST request with JSON body
 */
export async function post(url, body = null, options = {}) {
	const requestOptions = {
		...options,
		method: 'POST',
	}

	if (body !== null) {
		requestOptions.headers = {
			'Content-Type': 'application/json',
			...options.headers,
		}
		requestOptions.body = JSON.stringify(body)
	}

	return request(url, requestOptions)
}

/**
 * POST request with FormData body
 */
export async function postForm(url, formData, options = {}) {
	return request(url, {
		...options,
		method: 'POST',
		body: formData,
		// Don't set Content-Type header - browser will set it with boundary for FormData
	})
}

/**
 * PUT request with JSON body
 */
export async function put(url, body = null, options = {}) {
	const requestOptions = {
		...options,
		method: 'PUT',
	}

	if (body !== null) {
		requestOptions.headers = {
			'Content-Type': 'application/json',
			...options.headers,
		}
		requestOptions.body = JSON.stringify(body)
	}

	return request(url, requestOptions)
}

/**
 * DELETE request
 */
export async function deleteRequest(url, options = {}) {
	return request(url, {
		...options,
		method: 'DELETE',
	})
}

/**
 * Configuration utilities
 */
export function setBaseUrl(identifier, url) {
	BASE_URLS[identifier] = url
}

export function getConfig() {
	return { ...DEFAULT_CONFIG, baseUrls: { ...BASE_URLS } }
}

