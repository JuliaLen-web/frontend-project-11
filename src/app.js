import i18next from 'i18next'
import resources from './locales/index'
import renderMain from './components/main.js'
import view from "./view.js"
import validate from "./validate/index.js"
import handlerFormRequest from "./request/index.js"

export const processState = {
  initial: 'initial',
  validation: 'validation',
  pending: 'pending',
  finished: 'finished',
}

export default function () {
  const i18nextInstance = i18next.createInstance()
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: resources,
  }).then().catch((error) => {
    console.error('i18next initialization failed:', error);
  })

  renderMain(i18nextInstance)
  const elements = {
    form: document.querySelector('#formContainer form'),
    input: document.querySelector('#url-input'),
    error: document.querySelector('#feedback'),
  }

  const initialState = {
    processState: processState.initial,
    form: {
      error: '',
      data: '',
    },
    doneUrl: []
  }

  const handlerState = {}
  const state = new Proxy(initialState, handlerState)
  const watcherState = view(elements, state, i18nextInstance)

  elements.input.addEventListener('input', (e) => {
    const { value } = e.target
    state.form.data = value
  })

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault()
    watcherState.processState = processState.validation
    const error = validate(state.form.data)
    watcherState.form.error = error
    if (error === '') {
      watcherState.processState = processState.pending
      handlerFormRequest(watcherState, state)
    }
  })
}
