const mongoose = require('mongoose');

const ChuongSchema = new mongoose.Schema({
    MaChuong: { type: String, required: true, unique: true },
    MaHP: { type: mongoose.Schema.Types.ObjectId, ref: 'HocPhan._id', required: true },
    TenChuong: String,
    GioLyThuyet: Number,
    GiothucHanh: Number,
    SoGioTuHoc: Number,
    KyNangMem: Number,
    ChiTietChuong: [String]
});
module.exports = mongoose.model('Chuong', ChuongSchema);