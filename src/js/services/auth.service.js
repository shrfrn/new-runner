const AUTH_USER_KEY = 'loggedInUser'

const SESSION_META_KEY = 'sessionMeta'

const AUTH_SERVER_URL = 'http://localhost:3000'

export function getLoggedinUser() {
	const storedUser = localStorage.getItem(AUTH_USER_KEY)

	if (!storedUser) return null

	try {
		return JSON.parse(storedUser)
	} catch (error) {
		console.error('Failed to parse logged in user:', error)
		return null
	}
}

export async function login(credentials) {
	return requestAuth('/api/auth/login', credentials)
}

export async function signup(details) {
	return requestAuth('/api/auth/signup', details)
}

export function saveLoggedinUser(user) {
	if (!user || typeof user !== 'object') return false

	try {
		localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
		return true
	} catch (error) {
		console.error('Failed to save logged in user:', error)
		return false
	}
}

export function markSessionStart() {
	const payload = { timestamp: Date.now() }

	try {
		sessionStorage.setItem(SESSION_META_KEY, JSON.stringify(payload))
		return true
	} catch (error) {
		console.error('Failed to mark session start:', error)
		return false
	}
}

export async function logout() {
	try {
		const response = await fetch(`${AUTH_SERVER_URL}/api/auth/logout`, {
			method: 'POST',
			credentials: 'include',
		})

		if (!response.ok) {
			console.error(`Failed to log out on server: ${response.status} ${response.statusText}`)
			return false
		}

		localStorage.removeItem(AUTH_USER_KEY)
		sessionStorage.removeItem(SESSION_META_KEY)
		return true
	} catch (error) {
		console.error('Failed to log out:', error)
		return false
	}
}

async function requestAuth(path, payload) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
        credentials: 'include',
    }

	const url = `${AUTH_SERVER_URL}${path}`

	let response

	try {
		response = await fetch(url, requestOptions)
	} catch (error) {
		throw new Error('Network error. Please check your connection and try again.')
	}

	const data = await parseResponseJson(response)

	if (!response.ok) {
		const message = data?.message || 'Authentication failed. Please verify your details.'
		throw new Error(message)
	}

	if (!data || typeof data !== 'object') {
		throw new Error('Unexpected response from the server.')
	}

	return data
}

async function parseResponseJson(response) {
	try {
		return await response.json()
	} catch (error) {
		throw new Error('Invalid response from the server.')
	}
}

