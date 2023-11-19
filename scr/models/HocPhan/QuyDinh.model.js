const mongoose = require('mongoose')
const uuid = require('uuid');

const QuyDinhSchema = new mongoose.Schema({
    MaQD: { type: String,default:uuid.v4, required: true, unique: true },
    MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
    NoiDung: [String],
    LoaiQD: String,
  });
  
module.exports = mongoose.model('QuyDinh', QuyDinhSchema);