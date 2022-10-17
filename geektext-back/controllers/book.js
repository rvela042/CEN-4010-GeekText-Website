const Book = require('../models/book');
const httpResponse = require('../utility/backendShell');


//method to obtain books 
const read = async (req, res) => {
    try{
      const books = await Book.find({});
  
      httpResponse.successResponse(res, books);
    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

//method to create books
const create = async (req, res) => {
    try{

        const { author, country, imageLink, language, link, pages, title, year, genre, price, rating, ratingCount, overview } = req.body;
        const fields = {
            author,
            country,
            imageLink,
            language,
            link,
            pages,
            title,
            year,
            genre,
            price,
            rating,
            ratingCount,
            overview
        }

        const book = await Book.create(fields);

        httpResponse.successResponse(res, 'success')
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }

}

module.exports = {read, create};