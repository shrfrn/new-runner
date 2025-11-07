import { loadFromStorage, saveToStorage } from './util.service.js'

const STORAGE_KEY = 'exRunnerUsage'

export function logExerciseRun(exerciseId) {
	const events = getRunnerLog()
	const updatedEvents = [...events, { exId: exerciseId, ts: Date.now() }]

	saveToStorage(STORAGE_KEY, updatedEvents)
}

export function getRunnerLog() {
	const storedEvents = loadFromStorage(STORAGE_KEY)

	return Array.isArray(storedEvents) ? storedEvents : []
}

export function clearRunnerLog() {
	saveToStorage(STORAGE_KEY, [])
}
