const books = require('./books');
const { nanoid } = require('nanoid');

const addNewBook = (req, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
  const id = nanoid(10);

  // Check if book reading is already finshed
  const finished = readPage == pageCount? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };
  // Check if 'name' is empty
  if (!name) {
    const res = h.response({ // fail because book name is empty
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    res.code(400);
    return res;
  } else if (readPage > pageCount) { //fail because readPage > pageCount
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    res.code(400);
    return res;
  } else { // success, return bookId
    books.push(newBook); // Adding new book to books array
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      }
    });
    res.code(201);
    return res;
  }
};

const getAllBooks = (req, h) => {
  const { name, reading, finished } = req.query;
  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (reading !== undefined) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }
  if (finished !== undefined) {
    const isFinsihed = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === isFinsihed);
  }
  const res = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }))
    },
  });
  res.code(200);
  return res;
};

const getBookbyId = (req, h) => {
  const { bookId } = req.params;
  const bookById = books.find((book) => book.id === bookId);
  if (bookById != undefined) {
    const res = h.response({
      status: 'success',
      data: {
        book: bookById
      }
    }).code(200);
    return res;
  } else {
    const res = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    }).code(404);
    return res;
  }
};

const updateBookById = (req, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
  const { bookId }= req.params;
  const updatedAt = new Date().toISOString();

  const bookByIdIndex = books.findIndex((book) => book.id === bookId);
  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    }).code(400);
    return res;
  } else if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400);
    return res;
  } else if (bookByIdIndex === -1) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    }).code(404);
    return res;
  } else {
    books[bookByIdIndex] = { ...books[bookByIdIndex], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt };
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    });
    return res;
  }
};

const deleteBookById = (req, h) => {
  const { bookId } = req.params;
  const bookByIdIndex = books.findIndex((book) => book.id === bookId);
  if (bookByIdIndex !== -1) {
    books.splice(bookByIdIndex, 1);
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    }).code(200);
    return res;
  } else {
    const res = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    }).code(404);
    return res;
  }
};

module.exports = { getAllBooks, addNewBook, getBookbyId, updateBookById, deleteBookById };