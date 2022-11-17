const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

    cardnumber: {type: Number, required: true},
    expires: {type: Number, required: true},
    ssn: {type: Number, required: true},
    billingaddress: {type: String, required: true},
    name: {type: String, required: true},

})
const card = mongoose.model("card", cardSchema);

module.exports = card;