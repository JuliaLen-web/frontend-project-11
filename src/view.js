import onChange from 'on-change'

const renderErrors = (elements, state, i18n) => {
  const { error } = state.form
  Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
    if (error) {
      fieldElement.classList.add('is-invalid')
      elements.error.textContent = `${i18n.t(error)}`
    } else {
      fieldElement.classList.remove('is-invalid')
      elements.error.textContent = ''
    }
  })
}

export default function(elements, state, i18n) {
  return onChange(state, function () {
    renderErrors(elements, state,  i18n)
  })
}
