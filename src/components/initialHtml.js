import '../style.css'

export default function (i18n) {
  const app = document.querySelector('#app')
  app.innerHTML = `
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-break"></div>
          <div class="modal-footer">
            <a class="btn btn-primary full-article" href="#" role="button" target="_blank" rel="noopener noreferrer">
              ${i18n.t('modal.readAll')}
            </a>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${i18n.t('modal.close')}</button>
          </div>
        </div>
      </div>
    </div>
    <main class="flex-grow-1">
      <section id="formContainer" class="container-fluid bg-dark p-5">
        <div class="row">
          <div class="col-md-10 col-lg-8 mx-auto text-white">
            <h1 class="display-3 mb-0">${i18n.t('form.title')}</h1>
            <p class="lead">${i18n.t('form.subtitle')}</p>
            <form action="" class="rss-form text-body">
              <div class="row">
                <div class="col">
                  <div class="form-floating">
                    <input 
                      id="url-input" autofocus="" type="text" required="" name="url" aria-label="url" 
                      class="form-control w-100" placeholder="ссылка RSS" autocomplete="off"
                    >
                    <label for="url-input">${i18n.t('form.placeholder')}</label>
                  </div>
                </div>
                <div class="col-auto">
                  <button type="submit" aria-label="add" class="h-100 btn btn-lg btn-primary px-sm-5">${i18n.t('form.buttonText')}</button>
                </div>
              </div>
            </form>
            <p class="mt-2 mb-0 text-secondary">${i18n.t('form.example')}</p>
            <p id="feedback" class="feedback m-0 position-absolute small text-danger"></p>
          </div>
        </div>
      </section>
      <section id="resultContainer" class="container-fluid container-xxl p-5">
        <div class="row">
          <div id="posts" class="col-md-10 col-lg-8 order-1 mx-auto posts"></div>
          <div id="feeds" class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds"></div>
        </div>
      </section>
    </main>
  `
}
