const express = require('express')
const router = express.Router()

module.exports = router
//here we reach 9:34 -- how we discuss with the API

//requirements to reach each schema in the DB
const book = require('../controllers/book');
const test = require('../controllers/test');
const comments = require('../controllers/bookComments');

//test URL to see if we can GET data
router.get('/', (req, res) => res.send('Hi, group 12!'));

//router to get test dummy data
router.get('/tests', test.obtainTest);
router.post('/tests', test.create);

//need a route to get books
router.get('/books', book.read);
router.post('/books', book.create);

//need a route to get users

//need a route to get all credit card info

//need a route to get shipping address info

//need a route to get all wishlist info

//need a route to get wishlist item info 

//need a route to get comments 
router.get('/bookcomments', comments.create);
router.post('/bookComments', comments.create);