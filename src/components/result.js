export default function () {
  document.querySelector('#resultContainer').innerHTML = `
    <div class="row">
      <div id="posts" class="col-md-10 col-lg-8 order-1 mx-auto posts"></div>
      <div id="feeds" class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds"></div>
    </div>
  `
}
