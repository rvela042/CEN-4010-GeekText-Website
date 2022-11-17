const Book = require('../db/models/book');
const httpResponse = require('../utility/backendShell');

const bookByISBN = async (req, res) => {
    try {
      const { ISBN } = req.body;
      const bookByISBN = await Book.find({ISBN : ISBN});
      httpResponse.successResponse(res, bookByISBN);
    } catch (e) {
      console.log(e);
      httpResponse.failureResponse(res, e.toString());
    }
}

const bookByAuthor = async (req, res) => {
    try {
      const { author } = req.body;
      const bookByAuthor = await Book.find({author : author});
      httpResponse.successResponse(res, bookByAuthor);
    } catch (e) {
      console.log(e);
      httpResponse.failureResponse(res, e.toString());
    }
}

module.exports = {bookByISBN, bookByAuthor}; 
