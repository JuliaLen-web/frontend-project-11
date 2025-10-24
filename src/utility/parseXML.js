import {uniqueId} from "lodash"

const fields = {
  title: 'title',
  description: 'description',
  item: 'item',
  link: 'link',
}

const formatText = (text) => {
  return text.textContent.trim()
}

const parserDOM = (watchState, newUrlData ) => {
  const feedDoc = new DOMParser().parseFromString(newUrlData.data, "text/xml")

  watchState.feeds.push({
    title: formatText(feedDoc.querySelector(fields.title)),
    description: formatText(feedDoc.querySelector(fields.description)),
    feedId: newUrlData.id
  })

  const postsDoc = feedDoc.querySelectorAll(fields.item)
  const posts = []
  postsDoc.forEach(el => {
    posts.push({
      title: formatText(el.querySelector(fields.title)),
      link: formatText(el.querySelector(fields.link)),
      description: formatText(el.querySelector(fields.description)),
      id: uniqueId('post_'),
      feedId: newUrlData.id
    })
  })

  watchState.posts.push(...posts)
}

export default parserDOM
