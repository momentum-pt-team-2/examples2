import request from 'superagent'

function onSubmit (event) {
  event.preventDefault()
  console.log('submitted!')
  const query = document.getElementById('query').value
  requestData(query)
}

function requestData (query) {
  if (query === '') { return }
  console.log('query', query)
  request.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(function (result) {
      console.log('result', result)
      displayResults(result.body.items)
    })
}

function displayResults (books) {
  const booksAsHTML = books.map(book => createBookHTML(book))
  document.getElementById('results').innerHTML = booksAsHTML.join('')
}

function createBookHTML (book) {
  return `
  <div class="book row">
    <div class="col">
      <h2>${book.volumeInfo.title}</h2>
      <dl>
        <dt>Author</dt>
        <dd>${book.volumeInfo.authors.join(', ')}</dd>
        <dt>Publisher</dt>
        <dd>${book.volumeInfo.publisher}</dd>
      </dl>
    </div>
    <div class="col">
      <img src="${book.volumeInfo.imageLinks.smallThumbnail}">
    </div>
  </div>
  <hr />
  `
}

document.getElementById('search-form').addEventListener('submit', onSubmit)
