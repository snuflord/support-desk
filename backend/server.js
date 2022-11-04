const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('../backend/middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

// Connect to database - method allows connection to our mongo database, from db.js
connectDB()

const app = express()

// this method allows us to send raw JSON in requests
app.use(express.json())
// this method accepts URL encoded form.
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.json({message: 'welcome to support desk API!'})
})

// Routes - getting routes from user routes, which contains two controller functions. 
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

app.use(errorHandler)