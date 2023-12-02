const mongoose = require('mongoose')
const uuid = require('uuid');

const QuyDinhSchema = new mongoose.Schema({
    MaQD: { type: String,default:uuid.v4, required: true, unique: true },
    MaHP: { type: mongoose.Schema.Types.ObjectId, ref: 'HocPhan._id', required: true },
    NoiDung: [String],
    LoaiQD: String,
  });
  
module.exports = mongoose.model('QuyDinh', QuyDinhSchema);