import onChange from 'on-change'
import {processState} from "./app.js"

const resetError = (input, feedback) => {
  input.classList.remove('is-invalid')
  feedback.textContent = ''
  feedback.classList.remove('text-danger')
}

const renderError = (error, input, feedback, i18n) => {
    input.classList.add('is-invalid')
    feedback.textContent = `${i18n.t(error)}`
    feedback.classList.add('text-danger')
}

const renderSuccess = (valueData, input, feedback, i18n) => {
  valueData = ''
  input.value = ''
  input.focus()
  feedback.textContent = `${i18n.t('form.success')}`
  feedback.classList.add('text-success')
  return valueData
}

const renderStatus = (elements, state, i18n) => {
  const { processState: process, form } = state
  const input = elements.input
  const feedback = elements.error
  const button = elements.form.querySelector('button[type="submit"]')

  switch (process) {
    case processState.pending:
      button.disabled = true
      break
    case processState.finished:
      button.disabled = false
      if (form.error) {
        renderError(form.error, input, feedback, i18n)
      } else {
        renderSuccess(form.data, input, feedback, i18n)
      }
      break
    default:
      if (form.error) {
        renderError(form.error, input, feedback, i18n)
      } else {
        resetError(input, feedback)
      }
  }
}

export default function(elements, state, i18n) {
  return onChange(state, function () {
    renderStatus(elements, state,  i18n)
    console.log(state.newsItems)
  })
}
