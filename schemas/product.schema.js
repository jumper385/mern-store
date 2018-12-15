const mongoose = require('mongoose')

const Product = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock_level: { type: Number },
    last_modified: {type: Date}
})

module.exports = mongoose.model('Product', Product)