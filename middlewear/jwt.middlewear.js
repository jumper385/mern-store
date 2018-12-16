const jwt = require('jsonwebtoken')
// const express = require('express')

const decode = () => (req,res,next) => {
    const bearer = req.headers.authorization
    const token = bearer ? bearer.split(' ')[1] : null
    
    const verifyToken = (token) => token ? (
        jwt.verify(token, 'secret', (error, decoded) => {
            const verification = error ? null : decoded
            req.verification = verification
            next()
        })
    ) : ( () => {
            req.verification = null
            next()
    })

    const tokenVerification = (token) => {
        if(token) verifyToken(token)
        else {
            req.verification = null,
            next()
        }
    }

    tokenVerification(token)
}

module.exports = {
    decode: decode
}