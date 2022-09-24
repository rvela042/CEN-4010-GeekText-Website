const express = require('express')
const router = express.Router()

module.exports = router
//here we reach 9:34 -- how we discuss with the API

//requirements to reach each schema in the DB
const book = require('../controllers/book');

//need a route to get books
router.get('/books', book.read);
router.post('/books', book.create);

//need a route to get users

//need a route to get all credit card info

//need a route to get shipping address info

//need a route to get all wishlist info

//need a route to get wishlist item info 

//need a route to get comments 