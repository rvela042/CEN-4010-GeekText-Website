const mongoose = require('mongoose');

const shoppingCartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    cartContent: { type: Array, required: true }
})

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;
