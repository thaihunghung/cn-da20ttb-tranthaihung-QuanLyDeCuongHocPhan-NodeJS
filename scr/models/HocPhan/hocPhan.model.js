const mongoose = require('mongoose');

const HocPhanSchema = new mongoose.Schema({
    PhuLuc: String,
    MaMon: String,
    TenMon: String,
    SoGioTuHoc: String,
    TH: String,
    LT: String,
    MoTa: String,
    LoaiHocPhan: String,
    SoTC_LT: String,
    SoTC_TH: String,
    TrinhDo_DT: String,
    ChuyenNganh: String,
    HocKy: String,
    NamHoc: String,
    Nganh: String,
    fileName: 
      {
        type: String, 
        ref: 'Create.fileName',
        unique: true
      }
  });

module.exports = mongoose.model('HocPhan', HocPhanSchema);