const asyncHandler = require('express-async-handler')
// using bcrypt to encrypt user password
const bcrypt = require('bcryptjs')
// importing the userModel, which contains the schema/fields required for sign up
const User = require('../models/userModel')
// json web token
const jwt = require('jsonwebtoken')

// GENERATE USER TOKEN

// takes in user id are function parameter, returns jwt method called sign - signs with the user id, the jwt secret, and then an object that specifies the expiry date. 
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @desc Register a new user
// @route /api/users
// @access Public 

// REGISTER USER:

// this function - registerUser is wrapped in asyncHandler
const registerUser = asyncHandler(async (req, res) => {

    // require name, email, password as the request body response - this data is created by the user and sent via onSubmit in Register.
    const {name, email, password} = req.body

    // validation - if any of the fields are missing
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }
    // otherwise send to register route
    // Find if user already exists - 
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // Hash password - 'salt' is random characters added to password before being hashed/encrypted
    const salt = await bcrypt.genSalt(10)
    // the hashed password is returned by the bcrypt.hash method, which takes in the password and the salt data. - returns a hashed password. 
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user - using the User.create method from mongoose
    const user = await User.create({
        name,
        email, 
        password: hashedPassword,
    })

    // checking the created user, return 201 status and json of data.
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        }) 
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc Register a new user
// @route /api/login
// @access Public 

// LOG USER IN:

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    // if the user exists and the password entered matches that users password in the database:
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        }) 
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

// GET CURRENT USER

// @route /api/users/me
// @access Private 

const getMe = asyncHandler(async (req, res) => {
    // specifying what data we want back from the response
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    // corresponds with the findById method response in authMiddleware
    res.status(200).json(user)
})


// These functions above are exported here and called in userRoues: on successful condition of user data present, the user will be routed to the relevant page.
module.exports =  {
    registerUser,
    loginUser,
    getMe,
}