import i18next from 'i18next'
import resources from './locales/index'
import initialHtml from './components/initialHtml.js'
import view from "./view.js"
import validate from "./utility/validateForm.js"
import handlerFormRequest from "./request/getNews.js"
import { Modal } from 'bootstrap'

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

  initialHtml(i18nextInstance)
  const elements = {
    form: document.querySelector('#formContainer form'),
    input: document.querySelector('#url-input'),
    error: document.querySelector('#feedback'),
    modal: document.querySelector('#modal'),
    posts: document.querySelector('#posts'),
    feeds: document.querySelector('#feeds')
  }

  const initialState = {
    processState: processState.initial,
    form: {
      error: '',
      data: '',
    },
    posts: [],
    feeds: [],
    currentPostId: null,
    addedChannels: []
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
    const error = validate(state.form.data, state.addedChannels)
    watcherState.form.error = error
    if (error === '') {
      watcherState.processState = processState.pending
      handlerFormRequest(watcherState, state)
    }
  })

  new Modal(elements.modal)
  elements.modal.addEventListener('shown.bs.modal', function (e) {
    watcherState.currentPostId = e.relatedTarget.dataset.id
  })
}
