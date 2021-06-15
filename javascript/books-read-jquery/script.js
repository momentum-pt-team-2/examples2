/* global FormData */

import request from 'superagent'
import $ from 'jquery'

let BOOKS = []

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
  const $tableBody = $(`#${sectionId} tbody`)
  $tableBody.html(booksToHTML(books))
}

function booksToHTML (books) {
  return books.map(bookToHTML).join('\n')
}

function bookToHTML (book) {
  return `<tr class="book" id="book-${book._id}" data-book-id="${book._id}">
    <td>${book.title}</td>
    <td>${book.authors.join(', ')}</td>
    <td>
      <button type="button" class="button-edit" data-book-id="${book._id}">Edit</button>
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

function editBook (bookId) {
  const row = $(`#book-${bookId}`)
  const book = BOOKS.find(book => book._id === bookId)
  const $form = $(`
    <form id="form-${book._id}" data-book-id="${book._id}">
      <td><input type="text" name="title" value="${book.title}"></td>
      <td><input type="text" name="authors" value="${book.authors.join(', ')}"></td>
      <td>
        <input type="hidden" name="status" value="${book.status}">
        <button type="submit">Update</button>
      </td>
    </form>
  `)
  $form.submit(function (event) {
    event.preventDefault()

    const formData = new FormData($form.get(0))
    request.put(apiUrl(`books/${book._id}`))
      .auth('clinton', 'password123')
      .send({
        title: formData.get('title'),
        authors: formData.get('authors').split(/\s*,\s*/),
        status: formData.get('status')
      })
      .then(function (data) {
        getAndUpdateBooks()
      })
  })

  $('.container').append($form)
}

$(document).ready(function () {
  // without jQuery
  // document.addEventListener('click', function (event) {
  //   if (event.target && event.target.classList.contains('button-delete')) {
  //     const bookId = event.target.dataset.bookId
  //     deleteBook(bookId)
  //   }
  // })

  $(document).on('click', '.button-delete', function (event) {
    const bookId = event.target.dataset.bookId
    deleteBook(bookId)
  })

  $(document).on('click', '.button-edit', function (event) {
    const bookId = event.target.dataset.bookId
    editBook(bookId)
  })

  getAndUpdateBooks()

  $('#add-book-button').click(function () {
    $('#add-book-form').removeClass('hidden')
    $('#add-book-button').addClass('hidden')
  })

  $('#add-book-form').submit(function (event) {
    event.preventDefault()

    const title = $('#title').val()
    const authors = $('#authors').val().split(/\s*,\s*/)
    const status = $('#status').val()

    request
      .post(apiUrl('books'))
      .auth('clinton', 'password123')
      .send({
        title: title,
        authors: authors,
        status: status
      })
      .then(response => {
        $('#add-book-form').addClass('hidden').get(0).reset()
        $('#add-book-button').removeClass('hidden')
        BOOKS.push(response.body)
        updateAllBooks(BOOKS)
      })
      .catch((err) => {
        console.error(err)
      })
  })
})
