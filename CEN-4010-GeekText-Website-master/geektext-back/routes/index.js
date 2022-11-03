const express = require('express')
const router = express.Router()

module.exports = router

const Book = require('../controllers/book');
const Admin = require('../controllers/admin');
const Author = require('../controllers/author');

//Router to get, post, and delete books
router.post('/book', Book.create);
router.get('/book', Book.read);
router.delete('/book', Book.deleteBooks);

//Router to get, post, and delete an author
router.post('/author', Author.create);
router.get('/author', Author.read);
router.delete('/author', Author.deleteAuthor);

//Router to get, post, and delete an admin
router.post('/admin', Admin.create);
router.get('/admin', Admin.read);
router.delete('/admin', Admin.deleteAdmin);
