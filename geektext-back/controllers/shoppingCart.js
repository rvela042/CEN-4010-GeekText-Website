const Book = require('../db/models/book');
const ShoppingCart = require('../db/models/shoppingCart');
const httpResponse = require('../utility/backendShell');


// *** TESTED *** //
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

// *** TESTED *** //
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

// *** TESTED *** //
/* Lists all books in shopping cart
// Postman: GET /listBooksInCart
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


// *** TESTED *** //
/* Deletes all shopping carts in database
// Postman: DELETE /deleteAllCarts
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

// *** TESTED *** //
/* Adds book to shopping cart
// Postman: PUT /addToCart
// {
//        "bookId": "book1",
//        "userId": "user1"
//  }
*/
const addBookToCart = async (req, res) => {
  try {
      const { bookId, userId } = req.body;
      var inStock = false;
      // Find shopping cart by  useId
      const shoppingCart = await ShoppingCart.findOne({ userId });
      // Looking if book exists
      if(await Book.findOne({name: bookId})){ // name once its updated in data base
        inStock = true;
      } else {
        httpResponse.failureResponse(res, "Book Not In Store");
      } 
    if (inStock== true) {
        // Add bookId to cartContent
      if (shoppingCart.cartContent != undefined) {
        shoppingCart.cartContent.push(bookId)
      } else {
        shoppingCart.cartContent = [bookId];
      }
        // Update shopping cart on MongoDB
      await ShoppingCart.updateOne({ userId }, { cartContent: shoppingCart.cartContent });
      httpResponse.successResponse(res, 'success');
      }
  } catch (e) {
      console.log(e);
      httpResponse.failureResponse(res, e.toString());
  }
}

// *** TESTED *** //
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

