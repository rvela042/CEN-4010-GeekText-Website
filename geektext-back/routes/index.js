const express = require('express')
const router = express.Router()

module.exports = router
//here we reach 9:34 -- how we discuss with the API

//requirements to reach each schema in the DB
const book = require('../controllers/book');
const test = require('../controllers/test');
const wishlist = require('../controllers/wishlist');

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
router.get('/wishlists', wishlist.obtainWishlists);

//need a route to create a wishlist
router.post('/createwishlist', wishlist.create);

//need a route to add a book to a wishlist
router.post('/addtowishlist', wishlist.addBook);

//need a route to delete all wishlists
router.get('/wishlistDeleteAll', wishlist.deleteAll);

//need a route to list books in a user's wishlist
router.post('/listwishlistbooks', wishlist.listBooks);

//need a route to remove a book from user's wishlist
router.post('/removewishlistbook', wishlist.removeBook);

//need a route to get comments 
