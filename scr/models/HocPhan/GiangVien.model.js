const mongoose = require('mongoose')
const uuid = require('uuid');
const GiangVienSchema = new mongoose.Schema({
    MaGiangVien: { type: String,default:uuid.v4 ,required: true, unique: true },
    MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
    HoTen: String,
    ChucDanh: String,
  });

module.exports = mongoose.model('GiangVien', GiangVienSchema);