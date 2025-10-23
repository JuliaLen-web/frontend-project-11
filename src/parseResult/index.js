import {uniqueId} from "lodash"

const fields = {
  title: 'title',
  description: 'description',
  item: 'item',
  link: 'link',
}

const parserDOM = (watchState, doneUrl ) => {
  doneUrl.forEach(urlResult => {
    const doc = new DOMParser().parseFromString(urlResult.data, "text/xml")

    const title = doc.querySelector(fields.title).textContent
    const description = doc.querySelector(fields.description).textContent

    const news = []
    const items = doc.querySelectorAll(fields.item)
    items.forEach(el => {
      news.push({
        title: el.querySelector(fields.title).textContent,
        link: el.querySelector(fields.link).textContent,
        description: el.querySelector(fields.description).textContent,
        id: uniqueId('news_')
      })
    })

    watchState.newsItems.push({
      title: title,
      description: description,
      news: [...news]
    })
  })
}

export default parserDOM
