const mongoose = require('mongoose')
const uuid = require('uuid');
const DanhGia_HocPhanSchema = new mongoose.Schema({
    MaDG_HP: String,
    MaHP: { type: String, ref: 'HocPhan.fileName'},
    LoaiDG: String,
    HinhThucDG: String,
    TieuChiDG: String,
    NoiDungDG: String,
    CDRKetThuc: String,
    Tyle: String
  });
module.exports = mongoose.model('DG_HocPhan', DanhGia_HocPhanSchema);