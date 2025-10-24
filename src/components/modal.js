export default function (app) {
  const modal = document.createElement('div')
  modal.classList.add('modal', 'fade')
  modal.id = 'modal'
  modal.tabIndex = -1
  modal.ariaLabelledby = 'modal'
  modal.ariaHidden = 'true'

  modal.innerHTML = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"></h5>
          <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-break"></div>
        <div class="modal-footer">
          <a class="btn btn-primary full-article" href="#" role="button" target="_blank" rel="noopener noreferrer">
            Читать полностью
          </a>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  `

  return app.prepend(modal)
}
