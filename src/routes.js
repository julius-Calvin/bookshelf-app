const { getAllBooks, addNewBook, getBookbyId, updateBookById, deleteBookById } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path:'/books/{bookId}',
    handler: getBookbyId,
  },
  {
    method: 'POST',
    path:'/books',
    handler: addNewBook,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById,
  }
];

module.exports = routes;