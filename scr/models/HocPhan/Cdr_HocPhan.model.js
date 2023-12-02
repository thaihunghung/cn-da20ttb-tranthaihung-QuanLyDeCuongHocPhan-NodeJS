const mongoose = require('mongoose')
const uuid = require('uuid');
const CDR_HocPhanSchema = new mongoose.Schema({
    MaCDR_MH: { type: String,default: uuid.v4, required: true, unique: true },
    MaHP: { type: mongoose.Schema.Types.ObjectId, ref: 'HocPhan._id', required: true },
    loai_CDRMH: String,
    Noidung_CDRMH: String,
    TrinhDo: String,
    loaiTUA: String,
  });

module.exports = mongoose.model('CDR_HocPhan', CDR_HocPhanSchema);