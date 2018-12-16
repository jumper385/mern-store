const mongoose = require('mongoose')

const User = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: false },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
})

module.exports = mongoose.model('User', User)