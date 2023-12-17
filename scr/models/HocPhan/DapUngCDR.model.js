const mongoose = require('mongoose');

const DapUng_CDRSchema = new mongoose.Schema({
    Ten_CDR: { type: mongoose.Schema.Types.String, ref: 'CDR_CT', required: true },
    MaCDR_MH: { type: mongoose.Schema.Types.ObjectId, ref: 'CDR_MonHoc', required: true },
});

module.exports = mongoose.model('Dapung_CDR', DapUng_CDRSchema);