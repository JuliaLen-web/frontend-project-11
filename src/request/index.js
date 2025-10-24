import axios from "axios"
import { uniqueId } from "lodash"
import { processState } from "../app.js"
import parserDOM from "../parseResult/index.js";

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
      if (data?.contents && (data?.contents.includes('<?xml') || data?.contents.includes('<rss'))) {
        const newUrlData = {
          url: data?.status?.url,
          data: data?.contents,
          id: uniqueId('url_')
        }
        state.doneUrl.push({...newUrlData})
        parserDOM(watcherState, newUrlData)
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
