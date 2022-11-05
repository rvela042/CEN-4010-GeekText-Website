const ShoppingCart = require('../db/models/shoppingCart');
const httpResponse = require('../utility/backendShell');


/* Gets all shopping carts
// Postman: GET /shoppingCarts 
*/
const getCarts = async (req, res) => {
    try{
      const shoppingCarts = await ShoppingCart.find({});
  
      httpResponse.successResponse(res, shoppingCarts);
    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

/* Creates new shopping cart instance
// Postman: POST /shoppingCarts 
// {
//        "userId": "user1",
//        "cartContent": ["Book1", ""]
//  }
*/
const createCart = async (req, res) => {
  try {
      const {userId, cartContent} = req.body;
      const fields = {
          userId,
          cartContent
      }

      ShoppingCart.collection.createIndex({ userId: 1 }, { unique: true });
      const shoppingCart = await ShoppingCart.create(fields);

      httpResponse.successResponse(res, 'success');
  } catch (e) {
      console.log(e);
      httpResponse.failureResponse(res, e.toString());
  }
}

/* Lists all books in shopping cart
// Postman: POST /listBooksInCart
// {
//        "userId": "user1"
//  }
*/
const listBooksInCart = async (req, res) => {

  try {
      //Finds userId
      const { userId } = req.body;
      const shoppingCart = await ShoppingCart.findOne({ userId });
      //List books in shopping cart
      const listBooks = shoppingCart.cartContent;
      httpResponse.successResponse(res, listBooks);

  } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
  }
}

/* Deletes all shopping carts in database
// Postman: GET /deleteAllCarts
*/
const deleteAllCarts = async (req, res) => {
  try {

      const shoppingCart = await ShoppingCart.collection.drop();

      httpResponse.successResponse(res, 'success');
  } catch (e) {
      console.log(e);
      httpResponse.failureResponse(res, e.toString());
  }
}

/* Adds book to shopping cart
// Postman: POST /addToCart
// {
//        "bookId": "book1",
//        "userId": "user1"
//  }
*/
const addBookToCart = async (req, res) => {
  try {
      const { bookId, userId } = req.body;
      // Find shopping cart by  useId
      const shoppingCart = await ShoppingCart.findOne({ userId });
      // Add bookId to cartContent
      if (shoppingCart.cartContent != undefined) {
          shoppingCart.cartContent.push(bookId)
      } else {
          shoppingCart.cartContent = [bookId];
      }
      // Update shopping cart on MongoDB
      await ShoppingCart.updateOne({ userId }, { cartContent: shoppingCart.cartContent });
      httpResponse.successResponse(res, 'success');
  } catch (e) {
      console.log(e);
      httpResponse.failureResponse(res, e.toString());
  }
}

// Removes book from shopping cart
// Postman: POST /removeFromCart
// {
//        "userId": "user1",
//        "bookId": "book1"
//  }
const removeBookFromCart = async (req, res) => {
  try {
      //Finds shopping cart with userId
      const userId = req.body.userId;
      const bookId = req.body.bookId;
      const shoppingCart = await ShoppingCart.findOne({ userId });
      //Remove the book in the shopping cart
      const newCartContent = shoppingCart.cartContent.filter(storedBookId => storedBookId != bookId);
      //Update shopping cart on MongoDB
      await ShoppingCart.updateOne({ userId }, { cartContent: newCartContent });
      httpResponse.successResponse(res, 'success');

  } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = {getCarts, createCart, deleteAllCarts, listBooksInCart, addBookToCart, removeBookFromCart}; 
