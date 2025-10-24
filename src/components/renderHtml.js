import {processState} from "../app.js";

export const renderActivePostModal = (posts, currentPostId) => {
  const modal = {
    title: document.querySelector('#modal .modal-title'),
    description: document.querySelector('#modal .modal-body'),
    link: document.querySelector('#modal a'),
  }
  const activePost = {}

  posts.forEach(post => post.id === currentPostId ? Object.assign(activePost, post) : post)
  modal.title.textContent = activePost.title
  modal.description.textContent = activePost.description
  modal.link.href = activePost.link
}

const renderResultHeader = (container, name) => {
  return container.innerHTML = `
    <div class="card border-0">
      <div class="card-body"><h2 class="card-title h4">${name}</h2></div>
      <ul class="list-group border-0 rounded-0"></ul>
    </div>
  `
}

const renderPostsItem = (item, i18n) => {
  const li = document.createElement('li')
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
  li.innerHTML = `
      <a href="${item.link}" class="fw-bold" data-id="${item.id}" target="_blank" rel="noopener noreferrer">
        ${item.title}
      </a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modal">${i18n.t('post.button')}</button>
  `
  return li
}

export const renderPosts = (elements, posts, i18n) => {
  let ulPosts = elements.posts.querySelector('ul')
  if (!ulPosts) {
    renderResultHeader(elements.posts, i18n.t('post.name'))
    ulPosts = elements.posts.querySelector('ul')
  }

  return ulPosts ? posts.map(item => ulPosts.prepend(renderPostsItem(item, i18n))) : console.error('Not found <ul> for news')
}

const renderFeedsItem = (feed) => {
  const { title, description } = feed
  const li = document.createElement('li')
  li.classList.add('list-group-item', 'border-0', 'border-end-0')
  li.innerHTML = `
    <h3 class="h6 m-0">${title}</h3>
    <p class="m-0 small text-black-50">${description}</p>
  `
  return li
}

export const renderFeeds = (elements, newFeed, i18n) => {
  let ulFeeds = elements.feeds.querySelector('ul')

  if (!ulFeeds) {
    renderResultHeader(elements.feeds, i18n.t('feed.name'))

    ulFeeds = elements.feeds.querySelector('ul')
  }

  return ulFeeds ? newFeed.map(item => ulFeeds.prepend(renderFeedsItem(item)))  : console.error('Not found <ul> for feeds')
}

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

export const renderStatus = (elements, state, i18n) => {
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
