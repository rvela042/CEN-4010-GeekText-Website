const express = require('express')
const router = express.Router()

module.exports = router

//requirements to reach each schema in the DB
const admin = require('../controllers/admin');
const author = require('../controllers/author');
const bookSorter = require('../controllers/bbs');
const bookDetailSort = require('../controllers/bookdetailsort');
const book = require('../controllers/book');
const test = require('../controllers/test');
const wishlist = require('../controllers/wishlist');
const user = require('../controllers/user');
const card = require('../controllers/card');
const shoppingCart = require('../controllers/shoppingCart');
const comments = require('../controllers/comment');

//Router to get, post, and delete an author
router.post('/author', author.create);
router.get('/author', author.read);
router.delete('/author', author.deleteAuthor);

//Router to get, post, and delete an admin
router.post('/admin', admin.create);
router.get('/admin', admin.read);
router.delete('/admin', admin.deleteAdmin);

//Router to sort by ISBN and Author
router.get('/bookSort/ISBN', bookDetailSort.bookByISBN);
router.get('/bookSort/author', bookDetailSort.bookByAuthor);

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
router.delete('/deleteAllCarts', shoppingCart.deleteAllCarts);
router.get('/listBooksInCart', shoppingCart.listBooksInCart);
router.put('/addToCart', shoppingCart.addBookToCart);
router.post('/removeFromCart', shoppingCart.removeBookFromCart);


//need a route to get users
router.get('/users', user.findAllUsers);
router.get('/users/:username', user.findUserByUsername);
router.post('/users', user.createUser);
router.put('/users/:username', user.updateUser);

//need a route to get all credit card info
router.get('/users/:username/cards', card.retrieveCards);
router.post('/users/:username/cards', card.addCard);

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
router.post('/createBookComments', comments.createComment);
router.get('/readBookComments', comments.readComment);
router.get('/sortByHighestRating', comments.sortByHighestRating);
router.get('/displayAverageRating/', comments.displayAverageRating);

//routes for book browsing and sorting
router.get('/sortGenre', bookSorter.readByGenre);
router.get('/sortSeller', bookSorter.readBySeller);
router.get('/sortRating', bookSorter.readByRating);
router.get('/sortByPosition', bookSorter.readByX);
