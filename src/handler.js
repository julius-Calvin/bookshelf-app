const books = require('books');
const { nanoid } = require('nanoid');

const addNewBook = (req, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.payload;
  const id = nanoid(10);

  // Check if book reading is already finshed
  const isFinished = (pageCount, readPage) => {
    if (pageCount === readPage) {
      return true;
    } else {
      return false;
    }
  };
  const finished = isFinished(pageCount, readPage);
  const createdAt = new Date().toIsoString();
  const updatedAt = createdAt;
  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, createdAt, updatedAt };
  books.push(newBook); // Adding new book to books array
  // Check if 'name' is empty
  if (name === '') {
    const res = h.res({ // fail because book name is empty
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    res.code(400);
    return res;
  } else if (readPage > pageCount) { //fail because readPage > pageCount
    const res = h.res({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });
    res.code(400);
    return res;
  } else { // success, return bookId
    const res = h.res({
      status: 'success',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      data: {
        bookId: id,
      }
    });
    res.code(201);
    return res;
  }


};

const getAllBooks = (req, h) => {
  const res = h.response({
    status: 'success',
    data: books,
  });
  res.code(201);
  return res;

};

module.exports = { getAllBooks, addNewBook  };