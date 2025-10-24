import onChange from 'on-change'
import renderStatus from "./renders/renderStatusForm.js"
import renderNews from "./renders/renderNews.js"
import renderActivePostModal from "./renders/renderActivePostModal.js";

const markReadPost = (activePostId) => {
  const links = document.querySelectorAll('#posts ul li a')
  links.forEach(link => {
    if (activePostId === link.dataset.id) {
      link.classList.remove('fw-bold')
      link.classList.add('fw-normal')
    }
    return link
  })
}

export default function(elements, state, i18n) {
  return onChange(state, function (value, previousValue) {
    switch (value) {
      case "newsItems":
        renderNews(elements, state)
        break
      case "doneNewsItems":
        const activePostId = previousValue[previousValue.length - 1]
        renderActivePostModal(state.newsItems, activePostId)
        markReadPost(activePostId)
        break
      default:
        renderStatus(elements, state,  i18n)
    }
  })
}
