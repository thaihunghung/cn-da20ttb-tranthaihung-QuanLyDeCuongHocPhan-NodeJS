const mongoose = require('mongoose')

const CDR_HocPhanSchema = new mongoose.Schema({
    MaCDR_MH: Number,
    MaHP: { type: String, ref: 'HocPhan.fileName'},
    loai_CDRMH: String,
    Noidung_CDRMH: String,
    DapUng_CDRMH: String,
    TrinhDo: String,
    loaiTUA: String,
});
module.exports = mongoose.model('CDR_HocPhan', CDR_HocPhanSchema);