const mongoose = require('mongoose')
const uuid = require('uuid');
const GiangVienSchema = new mongoose.Schema({
    MaGiangVien: { type: String,default:uuid.v4 ,required: true, unique: true },
    MaHP: { type: String, ref: 'HocPhan.fileName'},
    DsGiangVien: String,
    BienSoan: String,
    PhanBien: String
  });

module.exports = mongoose.model('GiangVien', GiangVienSchema);