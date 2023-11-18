const mongoose = require('mongoose');

const ChuongSchema = new mongoose.Schema({
    MaChuong: { type: String, required: true, unique: true },
    MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
    TenChuong: String,
    GioLyThuyet: Number,
    GiothucHanh: Number,
    SoGioTuHoc: Number,
});

module.exports = mongoose.model('Chuong', ChuongSchema);