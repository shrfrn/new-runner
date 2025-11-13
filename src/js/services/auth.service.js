import * as http from './http.service.js'

const AUTH_USER_KEY = 'loggedInUser'

const SESSION_META_KEY = 'sessionMeta'

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
	return http.post('/api/auth/login', credentials, {
		baseUrl: 'AUTH_SERVER',
		credentials: 'include',
	})
}

export async function signup(details) {
	return http.post('/api/auth/signup', details, {
		baseUrl: 'AUTH_SERVER',
		credentials: 'include',
	})
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
		await http.post('/api/auth/logout', null, {
			baseUrl: 'AUTH_SERVER',
			credentials: 'include',
		})

		localStorage.removeItem(AUTH_USER_KEY)
		sessionStorage.removeItem(SESSION_META_KEY)
		return true
	} catch (error) {
		console.error('Failed to log out:', error)
		return false
	}
}


