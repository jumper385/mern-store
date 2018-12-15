const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../schemas/product.schema')

router.get('/', function (req, res, next) {
    res.json({ message: 'Welcome to the Products API' })
});

router.get('/getAll', (req, res, next) => {
    Product.find()
        .then(products => {
            const display = products.length ? (products) : 'The catalogue is currently empty'
            res.json({
                message: 'GET complete store catalogue',
                product_count: products.length,
                products: display
            })
        })
        .catch(error => {
            res.json({
                message: 'GET complete store catalogue',
                error: error
            })
        })
})

router.post('/', (req,res,next) => {
    const new_product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock_level: req.body.amount,
    })

    Product.create(new_product)
        .then(message => res.json(message))
})

router.get('/search/:id',(req,res,next) => {
    const id = req.params.id
    Product.findOne({_id:id})
        .then(product => {
            const didExist = product ? true : false
            const showProduct = didExist => didExist ? (
                res.json({product: product})
            ) : (
                res.json({error: `Product with id '${id}' does not exist`})
            )
            showProduct(didExist)
        })
        .catch(error => {
            res.json({error:error})
        })
})

router.patch('/search/:id', (req,res,next) => {
    const id = req.params.id
    Product.findOne({_id:id})
        .then(product => {
            const didExist = product ? true : false
            if(didExist) {
                const productID = product._id
                Product.updateOne({_id:productID},{
                    $set:req.body,
                    $currentDate: {last_modified:true}
                })
                    .exec()
                    .then(message => res.json(message))
                    .catch(error => res.json(error))
            }
            else { res.json({message: 'failed to find the product'})}
        })
})

module.exports = router;
