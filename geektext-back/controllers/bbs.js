const Book = require('../db/models/book');
//we will require the book model in order to retrieve the sorted data
const httpResponse = require('../utility/backendShell');


//method to obtain books by genre -- the required field in the models is titled 'genre'  
const readByGenre = async (req, res) => {
  try {
    const bookByGenre = await Book.find({ genre: req.params.author });
    httpResponse.successResponse(res, bookByGenre.sort);
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

//method to obtain books by top seller -- required fields come from Cynthia 
const readBySeller = async (req, res) => {
  try {
    const soldcopies = await Book.find({ soldcopies: req.params.author }).limit(10).sort({ soldcopies: -1 }); //we will obtain the "soldcopies" parameter in the books 
    httpResponse.successResponse(res, soldcopies.sort); // <---- maybe by putting .sort it'll work - need to read the function name to understand
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

//method to obtain books by a certain rating or higher -- required fields come from Axcel 
const readByRating = async (req, res) => {
  try {
    const sortedRating = await Book.find({ soldcopies: req.params.author }); //need to inquire about the arrays made in the 
    httpResponse.successResponse(res, sortedRating);
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = { readByGenre, readBySeller, }; 
