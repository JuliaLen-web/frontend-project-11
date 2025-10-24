import axios from "axios"
import { uniqueId } from "lodash"
import { processState } from "../app.js"
import parserDOM from "../utility/parseXML.js";

const saveUrlData = (data, state) => {
  const newChannelData = {
    url: data?.status?.url,
    data: data?.contents,
    id: uniqueId('feed_')
  }
  state.addedChannels.push({...newChannelData})
  return newChannelData
}

const handlerFormRequest = (watcherState, state) => {
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(state.form.data)}`, {
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
        const newChannelData = saveUrlData(data, state)
        parserDOM(watcherState, newChannelData)
      } else {
        watcherState.form.error = 'form.errors.isNotRss'
      }
    })
    .catch(error => {
      console.log(error, ' error pending')
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

export default handlerFormRequest
