const mongoose = require('mongoose');

const Dapung_CTSchema = new mongoose.Schema({
    MaMT_CTDT: { type: String, required: true },
    id_CDR: { type: mongoose.Schema.Types.String, ref: 'CDR_CT', required: true },
  });

module.exports = mongoose.model('Dapung_CT', Dapung_CTSchema);