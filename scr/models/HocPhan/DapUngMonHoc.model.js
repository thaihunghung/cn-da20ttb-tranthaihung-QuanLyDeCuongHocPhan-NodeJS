const mongoose = require('mongoose');

const DapUng_MHSchema = new mongoose.Schema({
    MaCDR_MH: { type: mongoose.Schema.Types.ObjectId, ref: 'CDR_HocPhan', required: true },
    MaChuong: { type: String, ref: 'Chuong', required: true },
});
module.exports = mongoose.model('DapUng_MH', DapUng_MHSchema);