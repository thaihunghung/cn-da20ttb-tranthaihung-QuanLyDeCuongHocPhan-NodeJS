const mongoose = require('mongoose');

const NoiDungChiTietChuongSchema = new mongoose.Schema({
    ID_Noidung: { type: String, required: true, unique: true },
    MaChuong: { type: mongoose.Schema.Types.String, ref: 'Chuong', required: true },
    TenNoiDung: String,
    GioLyThuyet: Number,
    GiothucHanh: Number,
    SoGioTuHoc: Number,
});

module.exports = mongoose.model('NoiDungChiTietChuong', NoiDungChiTietChuongSchema);