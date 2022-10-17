const Book = require('../models/book');
//we will require the book model in order to retrieve the sorted data
const httpResponse = require('../utility/backendShell');


//method to obtain books by genre -- the required field in the models is titled 'genre'  
const readByGenre = async (req, res) => {
    try {
      const bookByGenre = await Book.find({genre: req.params.author});
      httpResponse.successResponse(res, bookByGenre);
    } catch (e) {
      console.log(e);
      httpResponse.failureResponse(res, e.toString());
    }
}

//method to obtain books by top seller -- required field is TBA by Cynthia 
const readBySeller = async (req, res) => {
    try {
      const bookNumberSold = await Book.find({numberSold: req.params.author});
      httpResponse.successResponse(res, bookNumberSold); // <---- maybe by putting .sort it'll work - need to read the function name to understand
    } catch (e) {
      console.log(e);
      httpResponse.failureResponse(res, e.toString());
    }
}

module.exports = {readByGenre, readBySeller, };