export default function (newsItems, activePostId) {
  const modalTitle = document.querySelector('#modal .modal-title')
  const modalDescription = document.querySelector('#modal .modal-body')
  const modalLink = document.querySelector('#modal a')
  const activePost = {}
  newsItems.forEach(feed => feed.news.forEach(item => item.id === activePostId ? Object.assign(activePost, item) : item))

  modalTitle.textContent = activePost.title
  modalDescription.textContent = activePost.description
  modalLink.href = activePost.link
}
