export default function (i18n) {
  document.querySelector('#formContainer').innerHTML = `
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
  `
}
