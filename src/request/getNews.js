import axios from "axios"
import {uniqueId} from "lodash"
import { processState } from "../app.js"
import parserDOM from "../utility/parseXML.js";
import {differenceWith} from "lodash/array.js";

const saveUrlData = (data, link, state, isSavedFeed = false ) => {
  const newChannelData = {
    link: link,
    data: data?.contents,
  }
  if (!isSavedFeed ) state.addedChannels.push({...newChannelData, id: uniqueId('feed_')})
  return newChannelData
}

const getNews = (watcherState, url) => {
  const isSavedFeed = watcherState.addedChannels && watcherState.addedChannels.find(channel => channel.link === url)

  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`, {
    timeout: 10000 // Таймаут 10 секунд
  })
    .then(response => {
      if (response.status === 200) {
        return response.data
      }
      // throw new Error('Network response was not ok.')
    })
    .then(data => {
      const xmlString = data?.contents
      if (xmlString && (xmlString.includes('<?xml') || xmlString.includes('<rss'))) {

        const newChannelData = saveUrlData(data, url, watcherState, isSavedFeed)

        const { posts } = parserDOM(watcherState, newChannelData)
        const areLinkEqual = (a, b) => a.link === b.link
        const diffPosts = differenceWith(posts, watcherState.posts, areLinkEqual)

        if (!isSavedFeed) {
          const { feed } = parserDOM(watcherState, newChannelData)
          feed.id = newChannelData.id
          watcherState.feeds.push(feed)
        }

        if (diffPosts.length > 0) {
          const newPosts = diffPosts.map(post => {
            post.id = uniqueId('post_')
            post.feedId = watcherState.addedChannels?.find(channel => channel.link === url).id
            return post
          })

          watcherState.posts.push(...newPosts)
        }

      } else {
        watcherState.form.error = 'form.errors.isNotRss'
      }
    })
    .catch(error => {
      if(isSavedFeed) return
      switch (error.message) {
        case 'Network Error':
          watcherState.form.error = 'form.errors.network'
          break
        default:
          watcherState.form.error = 'form.errors.network'
      }
    })
    .finally(() => {
      watcherState.processState = processState.finished
    })
}


export default getNews
