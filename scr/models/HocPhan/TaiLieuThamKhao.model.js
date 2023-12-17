const mongoose = require('mongoose')
const uuid = require('uuid');
const TLTKSchema = new mongoose.Schema({
    MaTLTK: { type: String, default: uuid.v4, required: true, unique: true },
    MaHP: { type: String, ref: 'HocPhan.fileName'},
    NoiDung: String,
    loaiHocLieu: String,
  });

module.exports = mongoose.model('TaiLieu', TLTKSchema); 