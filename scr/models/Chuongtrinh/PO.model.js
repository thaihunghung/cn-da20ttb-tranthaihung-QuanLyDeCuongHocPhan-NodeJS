const mongoose = require('mongoose');

const MucTieuCTDTSchema = new mongoose.Schema({
    MaMT_CTDT: { type: String, required: true, unique: true },
    id_CT: { type: mongoose.Schema.Types.String, ref: 'ChuongTrinh', required: true },
    TenMT_CTDT: String,
    NoiDung: String,
  });
  
module.exports = mongoose.model('MucTieuCTDT', MucTieuCTDTSchema);