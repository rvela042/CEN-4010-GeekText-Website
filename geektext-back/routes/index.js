const express = require('express')
const router = express.Router()

module.exports = router

//requirements to reach each schema in the DB
const book = require('../controllers/book');
const test = require('../controllers/test');
const wishlist = require('../controllers/wishlist');
const shoppingCart = require('../controllers/shoppingCart');
const bookComments = require('../controllers/bookComments');


//test URL to see if we can GET data
router.get('/', (req, res) => res.send('Hi, group 12!'));

//router to get test dummy data
router.get('/tests', test.obtainTest);
router.post('/tests', test.create);

//Router to get, post, and delete books
router.post('/book', book.create);
router.get('/book', book.read);
router.delete('/book', book.deleteBooks);

//Routes for shopping cart
router.get('/shoppingCarts', shoppingCart.getCarts);
router.post('/shoppingCarts', shoppingCart.createCart);
router.get('/deleteAllCarts', shoppingCart.deleteAllCarts);
router.post('/listBooksInCart', shoppingCart.listBooksInCart);
router.post('/addToCart', shoppingCart.addBookToCart);
router.post('/removeFromCart', shoppingCart.removeBookFromCart);


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

//need a route to move a book from wishlist to shopping cart
router.post('/movetocart', wishlist.moveToCart);

//need a route to get comments 
router.get('/bookComments', bookComments.read);
router.post('/bookComments', bookComments.create);
