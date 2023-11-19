const mongoose = require('mongoose');
const uuid = require('uuid');

const PP_Day_hocSchema = new mongoose.Schema({
    MaPP: { type: String,default: uuid.v4 ,required: true, unique: true },
    MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
    TenPP: [String]
  });
  
module.exports = mongoose.model('PP_Day_hoc', PP_Day_hocSchema);