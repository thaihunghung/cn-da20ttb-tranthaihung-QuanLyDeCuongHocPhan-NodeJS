const mongoose = require('mongoose')
const uuid = require('uuid');
const GiangVienSchema = new mongoose.Schema({
    MaGiangVien: { type: String,default:uuid.v4 ,required: true, unique: true },
    MaHP: { type: mongoose.Schema.Types.ObjectId, ref: 'HocPhan._id', required: true },
    HoTen: String,
    ChucDanh: String,
  });

module.exports = mongoose.model('GiangVien', GiangVienSchema);