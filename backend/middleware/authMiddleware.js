const jwt = require('jsonwebtoken')
const asyncHandler  = require('express-async-handler')
const user = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    // authorisation 'starts with bearer' coming from postman authorisation > bearer token (in drop down menu)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            // token is the authorisation token returned from bearer token, splitting Bearer and $token, into an array (word Bearer is 0 index, ans the token will be index 1) then getting index 1 (the token)
            token = req.headers.authorization.split(' ')[1]
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get User (id) from token - then cut password from data returned
            req.user = await user.findById(decoded.id).select('-password')
            // next calls next middleware.
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorised')
        }
    }
    if(!token) {
        res.status(401)
            throw new Error('Not authorised')
    }
})

module.exports = {protect}