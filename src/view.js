import onChange from 'on-change'
import isEmpty from "lodash/isEmpty.js";

const renderErrors = (elements, state, i18n) => {
  const { error } = state.form
  Object.entries(elements.fields).forEach(([, fieldElement]) => {
    if (isEmpty(error)) {
      fieldElement.classList.remove('is-invalid')
      elements.error.textContent = ''
      elements.error.classList.remove('text-danger')
    } else {
      fieldElement.classList.add('is-invalid')
      elements.error.textContent = `${i18n.t(error)}`
      elements.error.classList.add('text-danger')
    }
  })
}

export default function(elements, state, i18n) {
  return onChange(state, function () {
    renderErrors(elements, state,  i18n)
  })
}
