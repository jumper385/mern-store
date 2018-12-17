const mongoose = require('mongoose')

const OrderUnit = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, rel: 'Product' },
    amount: { type: Number, required: true }
})

const Order = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    order_items: [{type:OrderUnit, required:true}],
    user_id: { type: mongoose.Types.ObjectId, required: true, rel: 'User' },
    delivery_address: { type: String, required: true },
    placement_date: {type: Date, required:true, default:new Date()}
})

module.exports = mongoose.model('Order', Order)