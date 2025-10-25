import onChange from 'on-change'
import { renderActivePostModal, renderFeeds, renderPosts, renderStatus } from './components/renderHtml.js'
import { differenceWith } from 'lodash/array.js'

const markReadPost = (activePostId) => {
  const links = document.querySelectorAll('#posts ul li a')
  links.forEach((link) => {
    if (activePostId === link.dataset.id) {
      link.classList.remove('fw-bold')
      link.classList.add('fw-normal')
    }
    return link
  })
}

export default function (elements, state, i18n) {
  return onChange(state, function (value, previousValue, applyData) {
    switch (value) {
      case 'posts':
        renderPosts(elements, differenceWith(previousValue, applyData), i18n)
        break
      case 'feeds':
        renderFeeds(elements, differenceWith(previousValue, applyData), i18n)
        break
      case 'currentPostId':
        renderActivePostModal(state.posts, state.currentPostId)
        markReadPost(state.currentPostId)
        break
      default:
        renderStatus(elements, state, i18n)
    }
  })
}
