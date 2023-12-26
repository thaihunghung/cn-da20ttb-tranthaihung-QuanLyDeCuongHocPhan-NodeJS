const mongoose = require('mongoose');

const CDR_CTSchema = new mongoose.Schema({
    id_CDR: { type: String, required: true, unique: true },
    id_CT: { type: mongoose.Schema.Types.String, ref: 'ChuongTrinh', required: true },
    Ten_CDR: String,
    LoaiCDR_CT: String,
    NoiDung: String,
  });

module.exports = mongoose.model('CDR_CT', CDR_CTSchema);