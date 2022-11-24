const Book = require('../db/models/book');
const BookComments = require('../db/models/bookComment');
//we will require the book model in order to retrieve the sorted data
const httpResponse = require('../utility/backendShell');

//method to obtain books by genre -- the required field in the models is titled 'genre'  --- DONE! 
const readByGenre = async (req, res) => {
    try {
      const bookByGenre = await Book.find({genre: req.body.genre});
      httpResponse.successResponse(res, bookByGenre);
    } catch (e) {
      httpResponse.failureResponse(res, e.toString());
    }
}

//method to obtain books by top 10 seller -- DONE!
const readBySeller = async (req, res) => {
    try {
      const soldTopCopies = await Book.find({}).limit(10).sort({soldcopies: -1});
      httpResponse.successResponse(res, soldTopCopies);
    } catch (e) {
      httpResponse.failureResponse(res, e.toString());
    }
}

//method to obtain books by a certain rating or higher 
const readByRating = async (req, res) => {
  try {
    const bookByRating = await BookComments.find({
      rating: {
        $gte: req.body.rating
      }
    })
    .sort({
      rating: -1
    });
    httpResponse.successResponse(res, bookByRating);
  } catch (e) {
    httpResponse.failureResponse(res, e.toString());
  }
}
//$gte means 'greater than or equal to' -- this is an inbuilt operator provided by mongodb

/*
method to retrieve a list of X books at a time where X is a 
particular integer from a given position in the overall recordset
*/
const readByX = async (req, res) => {
  try{
    const { requestedIndex, requestedAmount } = req.body;

    if(requestedAmount === 0){
      return httpResponse.successResponse(res, {numberOfBooks: [], size: 0});
    }

    const numberOfBooks = await Book.countDocuments({}).exec();
    const availableBooks = await Book.find({});
    const result = [];

    if(numberOfBooks < requestedIndex + requestedAmount){
      return httpResponse.failureResponse(res, "The Array is short of length!");
    }

    for(let collectionIndex = requestedIndex; collectionIndex < requestedIndex + requestedAmount; collectionIndex++){
      result.push(availableBooks.at(collectionIndex));
    }

    if(result.length > 0){
      return httpResponse.successResponse(res, {numberOfBooks: result, size: result.length});
    }
    
  }catch(e){
    return httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = {readByGenre, readBySeller, readByRating, readByX}; 
