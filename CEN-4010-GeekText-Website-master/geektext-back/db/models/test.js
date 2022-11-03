const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

const test = mongoose.model("test", testSchema);

module.exports = test;
