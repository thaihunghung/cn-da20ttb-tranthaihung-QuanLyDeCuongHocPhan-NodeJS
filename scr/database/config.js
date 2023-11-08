const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_DB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
    console.error("lỗi kết nối cơ sở dữ liệu"+err);
})
db.once('open', () =>{
    console.log("kết nối thành công");
})

module.exports = mongoose;