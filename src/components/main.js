import '../style.css'
import renderForm from './form.js'
import renderResult from './result.js'
import modal from "./modal.js";

export default function (i18n) {
  const app = document.querySelector('#app')
  app.innerHTML = `
    <main class="flex-grow-1">
      <section id="formContainer" class="container-fluid bg-dark p-5"></section>
      <section id="resultContainer" class="container-fluid container-xxl p-5"></section>
    </main>
  `
  renderForm(i18n)
  renderResult()
  modal(app)
}
