const express = require('express')
// The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests. 
const router = express.Router()
// importing controller functions
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
// here we are applying the protect middleware function as a second argument, which will implement it in the function call. 
router.get('/me', protect, getMe)

module.exports = router