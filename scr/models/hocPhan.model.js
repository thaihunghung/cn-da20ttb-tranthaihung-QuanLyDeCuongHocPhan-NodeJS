const mongoose = require('mongoose');

const HocPhanSchema = new mongoose.Schema({
    MaMon: { type: String, required: true, unique: true },
    TenMon: String,
    SoGioTuHoc: Number,
    TH: Number,
    LT: Number,
    MoTa: String,
    LoaiHocPhan: String,
    SoTC_LT: Number,
    SoTC_TH: Number,
    TrinhDo_DT: String,
    ChuyenNganh: String,
    HocKy: Number,
    NamHoc: Number,
  });

module.exports = mongoose.model('HocPhan', HocPhanSchema);