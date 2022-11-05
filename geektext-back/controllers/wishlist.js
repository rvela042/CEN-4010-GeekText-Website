const Wishlist = require('../db/models/wishlist');
const httpResponse = require('../utility/backendShell');

//method to create a wishlist belongs to a user

const create = async (req, res) => {
    try {
        const { wishlistName, userId } = req.body;
        const fields = {
            userId,
            wishlistName,
            bookList: []
        }

        Wishlist.collection.createIndex({ userId: 1, wishlistName: 1 }, { unique: true });
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
        const { bookId, wishlistName, userId } = req.body;
        // Find wishlist by name
        const wishlist = await Wishlist.findOne({ wishlistName, userId });
        // Add book Id to book list
        if (wishlist.bookList != undefined) {
            wishlist.bookList.push(bookId)
        } else {
            wishlist.bookList = [bookId];
        }
        // Update wishlist in db
        await Wishlist.updateOne({ wishlistName, userId }, { bookList: wishlist.bookList });
        httpResponse.successResponse(res, 'success');
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}



//method to list the books in a user’s wishlist

const listBooks = async (req, res) => {

    try {
        //Find user's wishlist
        const { wishlistName, userId } = req.body;
        const wishlist = await Wishlist.findOne({ wishlistName, userId });
        //List books in user's wishlist
        const listBooks = wishlist.bookList;
        httpResponse.successResponse(res, listBooks);

    } catch (e) {
        console.log(e)
        httpResponse.failureResponse(res, e.toString());
    }
}



//method to remove a book from user's wishlist

const removeBook = async (req, res) => {
    try {
        //Find user's wishlist
        const wishlistName = req.body.wishlistName;
        const userId = req.body.userId;
        const bookId = req.body.bookId;
        const wishlist = await Wishlist.findOne({ wishlistName, userId });
        //Find and remove the book in user's wishlist
        const newBookList = wishlist.bookList.filter(storedBookId => storedBookId != bookId);
        //Update new book list in db
        await Wishlist.updateOne({ wishlistName, userId }, { bookList: newBookList });
        httpResponse.successResponse(res, 'success');

    } catch (e) {
        console.log(e)
        httpResponse.failureResponse(res, e.toString());
    }
}


//method to move a book from user's wishlist to shopping cart
const moveToCart = async (req, res) => {
    try {
        //Find user's wishlist
        const wishlistName = req.body.wishListName;
        const userId = req.body.userId;
        const bookId = req.body.bookId;
        const wishlist = await Wishlist.findOne({ wishlistName, userId });
        //Find and remove the book in user's wishlist
        const newBookList = wishlist.bookList.filter(storedBookId => storedBookId != bookId);
        //Update new book list in db
        await Wishlist.updateOne({ wishlistName, userId }, { bookList: newBookList });
        //Move book to shopping cart <-- Waiting for code from Dayalis

        httpResponse.successResponse(res, 'success');

    } catch (e) {
        console.log(e)
        httpResponse.failureResponse(res, e.toString());
    }
}


module.exports = { create, obtainWishlists, addBook, deleteAll, listBooks, removeBook, moveToCart };
