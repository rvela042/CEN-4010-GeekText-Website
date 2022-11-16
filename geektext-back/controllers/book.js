const Book = require('../db/models/book');
const Admin = require('../db/models/admin');
const httpResponse = require('../utility/backendShell');

//method to obtain books
const read = async (req, res) => {
    try{
      const book = await Book.find({});
      httpResponse.successResponse(res, book);

    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

//method to create books only by admin
const create = async (req, res) => {
    try{
      const { username, password, ISBN, name, description, price, author, genre, publisher, yearpublished, soldcopies } = req.body;
      var authorized = false;

      if(await Admin.findOne({username: username, password: password})){
        authorized = true;
      } else {
        httpResponse.failureResponse(res, "Incorrect Username or Password");
      } 
        const fields = {
          ISBN,
          name,
          description,
          price,
          author,
          genre,
          publisher,
          yearpublished,
          soldcopies
        }
        if(authorized == true){
          const book = await Book.create(fields);
          httpResponse.successResponse(res, 'success')
        }

    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }
}

//Method to delete books
const deleteBooks = async (req, res) => {
  try{
    const { username, password, name} = req.body;
    if(await Admin.findOne({username: username, password: password})){
      const book = await Book.findOneAndDelete({name: name});
      httpResponse.successResponse(res, book);
    } else {
      httpResponse.failureResponse(res, "Incorrect Username or Password");
    } 
  } catch (e) {
    console.log(e)
    httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = {read, create, deleteBooks};
