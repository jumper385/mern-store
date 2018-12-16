const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { encrypt, decrypt } = require('../utilites/encryption.utils')
const jwtMiddleware = require('../middleware/jwt.middleware')

const saltRounds = 10

const User = require('../schemas/user.schema')

router.get('/', (req, res, next) => {
    res.json({ message: 'Welcome to the User API' })
})

router.post('/signup', (req, res, next) => {

    User.find({ username: req.body.username })
        .then(user => {
            console.log(user)
            if (!user.length) generateUser()
            else res.json({ error: 'user already exists' })
        })

    const generateUser = () => {
        bcrypt.hash(req.body.password, saltRounds)
            .then(password => {
                const new_user = new User({
                    _id: new mongoose.Types.ObjectId,
                    first_name: encrypt(req.body.first_name),
                    last_name: encrypt(req.body.last_name),
                    email: encrypt(req.body.email),
                    number: encrypt(req.body.number),
                    username: req.body.username,
                    password: encrypt(password),
                    role: encrypt(req.body.role)
                })
                new_user.save()
                    .then(message => res.json(message))
                    .catch(error => res.json({ error: error.message }))
            })
            .catch(error => res.json({ error: error.message }))
    }
})

router.post('/login', (req, res, next) => {

    User.findOne({ username: req.body.username })
        .then(({ first_name, last_name, email, number, username, password, role }) => {

            const _password = decrypt(password)

            bcrypt.compare(req.body.password, _password)
                .then(response => {
                    if (response) {
                        jwt.sign({
                            username: username,
                            first_name: decrypt(first_name),
                            last_name: decrypt(last_name),
                            email: decrypt(email),
                            number: decrypt(number),
                            role: decrypt(role)
                        }, 'secret', { expiresIn: '2 days' }, (error, token) => {
                            if (!error) res.json({ token: token })
                            else res.json({ error: error.message })
                        })
                    }
                })
                .catch(error => {
                    res.json({ error: error.message })
                })
        })
})

router.get('/profile', jwtMiddleware.decode(), (req, res, next) => {
    const token = req.verification ? req.verification : null

    if (token) {
        User.findOne({ username: token.username })
            .then(({username, email, number, first_name, last_name, role}) => {
                res.json({
                    username: username,
                    email: decrypt(email),
                    number: decrypt(number),
                    first_name: decrypt(first_name),
                    last_name: decrypt(last_name),
                    role: decrypt(role)
                })
            })
            .catch(error => {
                res.json({ error: error.message })
            })
    }
    else {
        res.json({ error: 'Token not found' })
    }
})

module.exports = router