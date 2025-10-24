import onChange from 'on-change'
import renderStatus from "./renders/renderStatusForm.js";
import renderNews from "./renders/renderNews.js";

export default function(elements, state, i18n) {
  return onChange(state, function () {
    renderStatus(elements, state,  i18n)
    renderNews(state.newsItems)
  })
}
