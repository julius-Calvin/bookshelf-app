const { getAllBooks, addNewBook, getBookbyId } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'POST',
    path:'/books',
    handler: addNewBook,
  },
  {
    method: 'GET',
    path:'/books/{bookId}',
    handler: getBookbyId,
  }
];

module.exports = routes;