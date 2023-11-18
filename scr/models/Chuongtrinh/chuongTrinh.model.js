const mongoose = require('mongoose');

const ChuongTrinhSchema = new mongoose.Schema({
    id_CT: { type: String, required: true, unique: true },
    TenChuongTrinh: String,
    LoaiHinh: String,
    STC_YeuCau: Number,
    Tg_DaoTao: Number,
    Bac: String,
  });
  
module.exports = mongoose.model('ChuongTrinh', ChuongTrinhSchema);
