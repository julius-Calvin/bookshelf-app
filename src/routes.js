const { getAllBooks, addNewBook } = require('./handler');

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
  }
];

module.exports = routes;