import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container-fluid bg-dark p-5 text-white">
    <h1>RSS агрегатор</h1>
    <p>Начните читать RSS сегодня! Это легко, это красиво.</p>
    <form class="row">
      <fieldset class="col">
          <input name="input" id="input" placeholder=""/>
          <label for="input">Ссылка RSS</label>
      </fieldset>
      
      <button type="submit" class="col-auto">Добавить</button>
    </form>
    <span>Пример: https://lorem-rss.hexlet.app/feed</span>
  </div>
`
