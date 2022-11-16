const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    wishlistName: { type: String, required: true },
    bookList: { type: Array, required: false }

})

const wishlist = mongoose.model("WishList", wishListSchema);

module.exports = wishlist;