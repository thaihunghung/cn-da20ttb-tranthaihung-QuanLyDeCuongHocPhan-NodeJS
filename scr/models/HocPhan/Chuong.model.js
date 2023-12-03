const mongoose = require('mongoose');
const uuid = require('uuid');

const ChuongSchema = new mongoose.Schema({
    MaChuong: { type: String, default: uuid.v4, required: true, unique: true },
    MaHP: { type: String, ref: 'HocPhan.fileName'},
    TenChuong: String,
    GioLyThuyet: Number,
    GiothucHanh: Number,
    SoGioTuHoc: Number,
    KyNangMem: Number,
    ChiTietChuong: [String]
});
module.exports = mongoose.model('Chuong', ChuongSchema);