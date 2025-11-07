import { login, signup, saveLoggedinUser, markSessionStart } from '../services/auth.service.js'

const FIELD_LABELS = {
	username: 'Email',
	password: 'Password',
	phone: 'Phone number',
	fullname: 'Full name',
}

export function initAuthPage({ container, onSuccess } = {}) {
	if (!container) return null

	const root = container.querySelector('[data-auth-root]')
	if (!root) return null

	const feedback = root.querySelector('[data-auth-feedback]')
	const tabButtons = Array.from(root.querySelectorAll('[role="tab"]'))
	const tabPanels = Array.from(root.querySelectorAll('[role="tabpanel"]'))
	const forms = Array.from(root.querySelectorAll('form[data-auth-form]'))

	const state = {
		root,
		feedback,
		tabButtons,
		tabPanels,
		forms,
		onSuccess,
		activeTab: '',
	}

	bindTabEvents(state)
	bindFormEvents(state)
	setActiveTab('signin', state)

	return state
}

function bindTabEvents(state) {
	state.tabButtons.forEach(button => {
		button.addEventListener('click', event => onTabClick(event, state))
		button.addEventListener('keydown', event => onTabKeyDown(event, state))
	})
}

function bindFormEvents(state) {
	state.forms.forEach(form => {
		form.addEventListener('submit', event => onFormSubmit(event, state))
	})
}

function onTabClick(event, state) {
	const target = event.currentTarget
	const tab = target?.dataset?.tab

	if (!tab) return

	setActiveTab(tab, state)
	target.focus()
}

function onTabKeyDown(event, state) {
	const order = state.tabButtons
	const currentIndex = order.findIndex(button => button.dataset.tab === state.activeTab)

	if (currentIndex === -1) return

	let nextIndex = currentIndex

	switch (event.key) {
		case 'ArrowRight':
		case 'ArrowDown':
			event.preventDefault()
			nextIndex = (currentIndex + 1) % order.length
			break
		case 'ArrowLeft':
		case 'ArrowUp':
			event.preventDefault()
			nextIndex = (currentIndex - 1 + order.length) % order.length
			break
		case 'Home':
			event.preventDefault()
			nextIndex = 0
			break
		case 'End':
			event.preventDefault()
			nextIndex = order.length - 1
			break
		default:
			return
	}

	const nextButton = order[nextIndex]
	if (!nextButton) return

	setActiveTab(nextButton.dataset.tab, state)
	requestAnimationFrame(() => nextButton.focus())
}

function setActiveTab(tab, state) {
	if (!tab) return

	state.activeTab = tab

	state.tabButtons.forEach(button => {
		const isActive = button.dataset.tab === tab
		button.setAttribute('aria-selected', isActive ? 'true' : 'false')
		button.tabIndex = isActive ? 0 : -1
	})

	state.tabPanels.forEach(panel => {
		const isActive = panel.dataset.tabpanel === tab
		panel.dataset.visible = isActive ? 'true' : 'false'
		panel.toggleAttribute('hidden', !isActive)
		panel.setAttribute('aria-hidden', isActive ? 'false' : 'true')
	})
}

async function onFormSubmit(event, state) {
	event.preventDefault()

	const form = event.currentTarget
	const mode = form?.dataset?.authForm

	if (!mode) return

	clearFeedback(state)

	const submitButton = form.querySelector('[type="submit"]')
	const values = collectFormValues(form)
	const emptyField = findEmptyField(values)

	if (emptyField) {
		handleMissingField(form, emptyField, state)
		return
	}

	setSubmittingState(form, submitButton, true)

	try {
		const user = await performAuth(mode, values)
		saveLoggedinUser(user)
		markSessionStart()
		const successMessage = mode === 'signup'
			? 'Account created successfully!'
			: 'Signed in successfully!'
		showSuccess(state, successMessage)
		form.reset()
		if (state.onSuccess) state.onSuccess(user, mode)
	} catch (error) {
		showError(state, error.message)
	} finally {
		setSubmittingState(form, submitButton, false)
	}
}

function collectFormValues(form) {
	const values = {}
	const elements = Array.from(form.elements).filter(el => el.name)

	elements.forEach(element => {
		if (element.type === 'submit') return
		element.removeAttribute('aria-invalid')
		values[element.name] = element.value?.trim() || ''
	})

	return values
}

function findEmptyField(values) {
	return Object.keys(values).find(key => !values[key])
}

function handleMissingField(form, fieldName, state) {
	const friendlyName = FIELD_LABELS[fieldName] || fieldName
	showError(state, `Please fill in ${friendlyName}.`)

	const field = form.querySelector(`[name="${fieldName}"]`)
	if (!field) return

	field.focus()
	field.setAttribute('aria-invalid', 'true')
}

function setSubmittingState(form, button, isSubmitting) {
	if (isSubmitting) form.setAttribute('aria-busy', 'true')
	else form.removeAttribute('aria-busy')

	if (!button) return

	button.disabled = isSubmitting
	button.dataset.loading = isSubmitting ? 'true' : 'false'
}

async function performAuth(mode, payload) {
	switch (mode) {
		case 'signin':
			return login(payload)
		case 'signup':
			return signup(payload)
		default:
			throw new Error('Unsupported authentication mode.')
	}
}

function clearFeedback(state) {
	if (!state.feedback) return

	state.feedback.textContent = ''
	state.feedback.classList.remove('error', 'success')
}

function showError(state, message) {
	if (!state.feedback) return

	state.feedback.textContent = message
	state.feedback.classList.add('error')
	state.feedback.classList.remove('success')
}

function showSuccess(state, message) {
	if (!state.feedback) return

	state.feedback.textContent = message
	state.feedback.classList.add('success')
	state.feedback.classList.remove('error')
}

