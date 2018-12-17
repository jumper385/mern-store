const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/', function (req, res, next) {
  jwt.sign({ message: 'hello world', role:'admin', verified:true}, 'secret', { expiresIn: '2 days' }, (error, token) => {
    if (error) throw error
    res.json({ message: 'Welcome to the API', jwt_key: token })
  })
});

module.exports = router;