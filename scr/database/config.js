const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_DB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('connect to Mongoose')
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error)
    }
}
module.exports = {connect};
