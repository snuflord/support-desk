const mongoose = require('mongoose')

// this function handles connecting to the mongoose database, using the MONGO_URI from .env, which was generated in MongoDb cluster > connect > connect to application > copy/paste connection string > replace password.
const connectDB = async () => {
    try {
        // mongoose.connect connects to the cluster via the URI.
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error: ${error.message.red.underline.bold}`)
        process.exit(1)
    }
}

// So now we have the connection to the mongo database parameters set up, we can export this method so that our requests can be made to it. Exported and called in server.js
module.exports = connectDB