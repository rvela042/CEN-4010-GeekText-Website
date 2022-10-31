const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {type: String, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    email: {type: String, required: false},
    homeaddress: {type: String, required: false},

}
)


const user = mongoose.model("user", userSchema);

module.exports = user;


