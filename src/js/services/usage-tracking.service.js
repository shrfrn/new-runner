import { loadFromStorage, saveToStorage } from './util.service.js'

const STORAGE_KEY = 'exRunnerUsage'

export function logExerciseRun(exerciseId) {
	const storedEvents = loadFromStorage(STORAGE_KEY)

	const events = Array.isArray(storedEvents) ? storedEvents : []
	const updatedEvents = [...events, { exId: exerciseId, ts: Date.now() }]

	saveToStorage(STORAGE_KEY, updatedEvents)
}
