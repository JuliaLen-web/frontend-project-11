import i18next from 'i18next'
import resources from './locales/index'
import renderMain from './components/main.js'
import view from "./view.js"
import validate from "./validate/index.js"
import isEmpty from 'lodash/isEmpty.js'

export default async function () {
  const i18nextInstance = i18next.createInstance()
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: resources,
  })
  renderMain(i18nextInstance)
  const elements = {
    form: document.querySelector('#formContainer form'),
    fields: {
      url: document.querySelector('#url-input'),
    },
    error: document.querySelector('#feedback'),
  }

  const initialState = {
    form: {
      valid: true,
      error: '',
      fields: {
        url: '',
      },
    }
  }

  const handlerState = {}
  const state = new Proxy(initialState, handlerState)
  const watcherState = view(elements, state, i18nextInstance)

  Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
    fieldElement.addEventListener('input', (e) => {
      const { value } = e.target
      state.form.fields[fieldName] = value
    })
  })

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault()
    const error = validate(state.form.fields)
    watcherState.form.error = error
    state.form.valid = isEmpty(error)
    if (state.form.valid) {
      Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
        state.form.fields[fieldName] = ''
        fieldElement.value = ''
        elements.error.textContent = `${i18nextInstance.t('form.success')}`
        elements.error.classList.add('text-success')
      })
    } else {
      elements.error.classList.remove('text-success')
    }
  })
}
