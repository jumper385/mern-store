const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const jwtMiddleware = require('../Middleware/jwt.middleware')

const Order = require('../schemas/order.schema')

router.get('/',(req,res,next) => {
    res.json({message:'Welcome to the Orders API'})
})

router.post('/', jwtMiddleware.decode(), (req,res,next) => {
    const token = req.verification ? req.verification : null
    
    if(token) {
        const new_order = new Order ({
            _id: new mongoose.Types.ObjectId,
            ...req.body
        })
        
        new_order.save()
            .then(message => {
                res.json(message)
                console.log(new_order)
            })
            .catch(error => {error:error.message})
    } else {
        res.json({error:'invalid permissions'})
    }
})

router.get('/allOrders', jwtMiddleware.decode(), (req,res,next) => {
    const token = req.verification ? req.verification : null
    if(token && token.role === 'admin'){
        Order.find()
            .then(orders => {
                res.json(orders)
            })
    }
    else {
        res.json({message:'invalid permissions'})
    }
})

module.exports = router;
