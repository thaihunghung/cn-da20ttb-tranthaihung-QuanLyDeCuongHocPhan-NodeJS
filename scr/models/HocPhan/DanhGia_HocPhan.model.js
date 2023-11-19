const mongoose = require('mongoose')
const uuid = require('uuid');
const DanhGia_HocPhanSchema = new mongoose.Schema({
    MaDG_HP: { type: String,default: uuid.v4, required: true, unique: true },
    MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
    TenDG: [String],
    LoaiDG: String,
    TieuChiDG: String,
    NoiDung_DG: String,
    Tyle: String
  });

module.exports = mongoose.model('DG_HocPhan', DanhGia_HocPhanSchema);