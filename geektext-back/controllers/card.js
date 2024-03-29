const Card = require('../db/models/card');
const User = require('../db/models/user');
const httpResponse = require('../utility/backendShell');

//obtain data

const retrieveCards = async (req, res) => {
    try{
      const user = await User.find({"username": req.params.username},{username: 1, creditCard: 1});

      httpResponse.successResponse(res, user)
    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

  //post data

  const addCard = async (req, res) => {
    try{

        const user = await User.findOne({"username": req.params.username});
        const { cardnumber, expires, ssn, billingaddress, name} = req.body;
        const fields = {
            cardnumber,
            expires,
            ssn,
            billingaddress,
            name
        }

        const card = await Card.create(fields);
       
        
        if (user.creditCard != undefined) {
          user.creditCard.push(card)
      } else {
          user.creditCard = [card];
      }
      // Update wishlist in db
      await User.updateOne({ "username": req.params.username}, { creditCard: user.creditCard });
        
        
        
        httpResponse.successResponse(res, 'success')
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }

}

module.exports = {retrieveCards, addCard};