const renderFeedsHeader = (container) => {
  return container.innerHTML = `
    <div class="card border-0">
      <div class="card-body"><h2 class="card-title h4">Фиды</h2></div>
      <ul class="list-group border-0 rounded-0"></ul>
   </div>
  `
}

const renderPostsHeader = (container) => {
  return container.innerHTML = `
    <div class="card border-0">
      <div class="card-body"><h2 class="card-title h4">Посты</h2></div>
      <ul class="list-group border-0 rounded-0"></ul>
    </div>
  `
}

const renderNewsItem = (item, doneNewsItems, i18n) => {
  const li = document.createElement('li')
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
  li.innerHTML = `
      <a href="${item.link}" class="${doneNewsItems.includes(item.id) ? 'fw-normal' : 'fw-bold'}" data-id="${item.id}" target="_blank" rel="noopener noreferrer">
        ${item.title}
      </a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modal">${i18n.t('post.button')}</button>
  `
  return li
}

const renderPosts = (container, news, doneNewsItems, i18n) => {
  return container ? news.map(item => container.prepend(renderNewsItem(item, doneNewsItems, i18n))) : console.error('Not found <ul> for news')
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

const renderFeeds = (container, feed) => {
  return container ? container.prepend(renderFeedsItem(feed)) : console.error('Not found <ul> for feeds')
}

const renderNews = (elements, state, i18n) => {
  const { doneNewsItems, newsItems } = state
  let ulPosts = elements.posts.querySelector('ul')
  let ulFeeds = elements.feeds.querySelector('ul')

  if (!ulPosts && !ulFeeds) {
    renderPostsHeader(elements.posts)
    renderFeedsHeader(elements.feeds)

    ulPosts = elements.posts.querySelector('ul')
    ulFeeds = elements.feeds.querySelector('ul')
  } else {
    ulPosts.innerHTML = ''
    ulFeeds.innerHTML = ''
  }

  newsItems.map(newsItem => {
    renderPosts(ulPosts, newsItem.news, doneNewsItems, i18n)
    renderFeeds(ulFeeds, {title: newsItem.title, description: newsItem.description})
  })
}

export default renderNews
