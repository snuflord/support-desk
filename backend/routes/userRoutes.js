const express = require('express')
const router = express.Router()
// importing controller functions
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
// here we are applying the protect middleware function as a second argument, which will implement it in the function call. 
router.get('/me', protect, getMe)

module.exports = router