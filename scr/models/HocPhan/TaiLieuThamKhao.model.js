const mongoose = require('mongoose')
const uuid = require('uuid');
const TLTKSchema = new mongoose.Schema({
    MaTLTK: { type: String, default: uuid.v4, required: true, unique: true },
    MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
    tenTLTK: { type: String, required: true },
    tacGia: [String],
    namXuatBan: Number,
    loaiHocLieu: String,
    nguon: String, 
  });

module.exports = mongoose.model('TLTK', TLTKSchema);