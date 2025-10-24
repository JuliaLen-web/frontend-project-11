import {uniqueId} from "lodash"

const fields = {
  title: 'title',
  description: 'description',
  item: 'item',
  link: 'link',
}

const parserDOM = (watchState, newUrlData ) => {
  const doc = new DOMParser().parseFromString(newUrlData.data, "text/xml")

  const title = doc.querySelector(fields.title).textContent
  const description = doc.querySelector(fields.description).textContent

  const news = []
  const items = doc.querySelectorAll(fields.item)
  items.forEach(el => {
    news.push({
      title: el.querySelector(fields.title).textContent,
      link: el.querySelector(fields.link).textContent,
      description: el.querySelector(fields.description).textContent,
      id: uniqueId('')
    })
  })

  watchState.newsItems.push({
    title: title,
    description: description,
    news: [...news]
  })
}

export default parserDOM
