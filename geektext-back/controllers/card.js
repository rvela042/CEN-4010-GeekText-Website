const Card = require('../models/card');
const httpResponse = require('../utility/backendShell');

//obtain data

const obtainCard = async (req, res) => {
    try{
      const cards = await Card.find({});
  
      httpResponse.successResponse(res, cards);
    } catch (e) {
      console.log(e)
      httpResponse.failureResponse(res, e.toString());
    }
  }

  //post data

  const create = async (req, res) => {
    try{

        const { cardnumber, expires, ssn, billingaddress, name} = req.body;
        const fields = {
            cardnumber,
            expires,
            ssn,
            billingaddress,
            name
        }

        const card = await Card.create(fields);

        httpResponse.successResponse(res, 'success')
    } catch (e) {
        console.log(e);
        httpResponse.failureResponse(res, e.toString());
    }

}

module.exports = {obtainCard, create};