import { saveToStorage, loadFromStorage } from './util.service.js'

const CONFIG_KEY = 'exRunnerSettings'

// Default configuration
const defaultConfig = {
    lastEntryId: 1,
    autoRun: false,
}

// Load configuration from localStorage
function loadConfig() {
    try {
        const savedConfig = loadFromStorage(CONFIG_KEY)
        if (savedConfig) return savedConfig

        // Initialize with default settings
        saveConfig(defaultConfig)
        return { ...defaultConfig }
    } catch (error) {
        console.error('Error loading config:', error)
        // In case of error, use defaults
        return { ...defaultConfig }
    }
}

// Save configuration to localStorage
function saveConfig(config) {
    try {
        saveToStorage(CONFIG_KEY, config)
    } catch (error) {
        console.error('Error saving config:', error)
    }
}

export { 
    loadConfig,
    saveConfig,
} 