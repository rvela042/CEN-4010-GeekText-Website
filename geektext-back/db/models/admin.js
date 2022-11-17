const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;