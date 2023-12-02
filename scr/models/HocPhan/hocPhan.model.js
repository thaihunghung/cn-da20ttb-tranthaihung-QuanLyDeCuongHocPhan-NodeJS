const mongoose = require('mongoose');

const HocPhanSchema = new mongoose.Schema({
    PhuLuc: String,
    MaMon: String,
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
    fileName: 
      {
        type: String, 
        ref: 'Create.fileName',
        unique: true
      }
  });

module.exports = mongoose.model('HocPhan', HocPhanSchema);