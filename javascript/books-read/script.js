import request from 'superagent'

let BOOKS = []

function id (idString) {
  return document.getElementById(idString)
}

function apiUrl (fragment) {
  return `https://books-api.glitch.me/api/${fragment}`
}

function deleteBook (bookId) {
  request
    .delete(apiUrl(`books/${bookId}`))
    .auth('clinton', 'password123')
    .then(response => {
      BOOKS = BOOKS.filter(book => book._id !== bookId)
      updateAllBooks(BOOKS)
    })
}

function updateAllBooks (books) {
  updateSection('books-reading', books.filter(book => book.status === 'reading'))
  updateSection('books-toread', books.filter(book => book.status === 'toread'))
  updateSection('books-read', books.filter(book => book.status === 'read'))
}

function updateSection (sectionId, books) {
  const section = id(sectionId)
  const tableBody = section.querySelector('tbody')
  tableBody.innerHTML = booksToHTML(books)
  tableBody.querySelectorAll('.button-delete').forEach(button => {
    button.addEventListener('click', event => {
      const bookId = button.dataset.bookId
      deleteBook(bookId)
    })
  })
}

function booksToHTML (books) {
  // map
  // var booksHTML = []
  // for (var book of books) {
  //   booksHTML.push(bookToHTML(book))
  // }

  return books.map(bookToHTML).join('\n')
}

function bookToHTML (book) {
  return `<tr data-book-id="${book._id}">
    <td>${book.title}</td>
    <td>${book.authors.join(', ')}</td>
    <td>
      <button type="button" class="button-delete button-danger" data-book-id="${book._id}">Delete</button>
    </td>
  </tr>`
}

function getAndUpdateBooks () {
  request
    .get(apiUrl('books'))
    .auth('clinton', 'password123')
    .then(response => {
      BOOKS = response.body.books
      updateAllBooks(BOOKS)
    })
}

getAndUpdateBooks()

id('add-book-button').addEventListener('click', function () {
  id('add-book-form').classList.remove('hidden')
  id('add-book-button').classList.add('hidden')
})

id('add-book-form').addEventListener('submit', function (event) {
  event.preventDefault()

  const title = id('title').value
  const authors = id('authors').value.split(/\s*,\s*/)
  const status = id('status').value

  request
    .post(apiUrl('books'))
    .auth('clinton', 'password123')
    .send({
      title: title,
      authors: authors,
      status: status
    })
    .then(response => {
      id('add-book-form').reset()
      id('add-book-form').classList.add('hidden')
      id('add-book-button').classList.remove('hidden')
      BOOKS.push(response.body)
      updateAllBooks(BOOKS)
    })
    .catch((err) => {
      console.error(err)
    })
})
