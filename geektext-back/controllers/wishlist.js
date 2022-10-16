const Wishlist = require('../models/wishlist');
const httpResponse = require('../utility/backendShell');

//method to create a wishlist belongs to a user

const create = async (req, res) => {
    try {
        await Wishlist.collection.createIndex({ userID: 1, wishlistName: 1 }, { unique: true });
        const { wishlistName, userId } = req.body;
        const fields = {
            userId,
            wishlistName,
            bookList: []
        }

        const wishlist = await Wishlist.create(fields);

        httpResponse.successResponse(res, 'success');
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}



//method to delete all wishlists

const deleteAll = async (req, res) => {
    try {

        const wishlist = await Wishlist.collection.drop();

        httpResponse.successResponse(res, 'success');
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}



//method to obtain all wishlists

const obtainWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist.find({});

        httpResponse.successResponse(res, wishlists);
    } catch (e) {
        console.log(e)
        httpResponse.failureResponse(res, e.toString());
    }
}



// method to add a book to a user's wishlist

const addBook = async (req, res) => {
    try {
        const { bookId, wishlistName } = req.body;
        // Find wishlist by name
        const wishlist = await Wishlist.find({ wishlistName: wishlistName });
        // Add book Id to book list
        if (wishlist.bookList != undefined) {
            wishlist.bookList.push(bookId)
        } else {
            wishlist.bookList = [bookId];
        }
        // Update wishlist in db
        await Wishlist.updateOne({ wishlistName: wishlistName }, wishlist);
        httpResponse.successResponse(res, 'success');
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}



//method to list the books in a user’s wishlist




//method to remove a book from user's wishlist to the shopping cart



module.exports = { create, obtainWishlists, addBook, deleteAll };
