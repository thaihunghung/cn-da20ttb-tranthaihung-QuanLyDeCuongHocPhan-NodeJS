const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the 'ChuongTrinh' schema
const chuongTrinhSchema = new Schema({
  tenChuongTrinh: String,
  mucTieuCTDT: String,
  dapUng_CT: [{ type: Schema.Types.ObjectId, ref: 'DapUng_CT' }]
});

// Define the 'DapUng_CT' schema
const dapUng_CTSchema = new Schema({
  chiTiet: String,
  CDR_CT: [{ type: Schema.Types.ObjectId, ref: 'CDR_CT' }]
});

// Define the 'CDR_CT' schema
const cdr_CTSchema = new Schema({
  moTa: String,
  dapUng_CDR: [{ type: Schema.Types.ObjectId, ref: 'DapUng_CDR' }]
});

// Define the 'DapUng_CDR' schema
const dapUng_CDRSchema = new Schema({
  chiTiet: String,
  CDR_MonHoc: [{ type: Schema.Types.ObjectId, ref: 'CDR_MonHoc' }]
});

// Define the 'MonHoc' schema
const monHocSchema = new Schema({
  tenMonHoc: String,
  TLTK: String,
  dapUng_MH: [{ type: Schema.Types.ObjectId, ref: 'DapUng_MH' }],
  chuong: [{ type: Schema.Types.ObjectId, ref: 'Chuong' }]
});

// Define the 'CDR_MonHoc' schema
const cdr_MonHocSchema = new Schema({
  moTa: String,
  dapUng_MH: [{ type: Schema.Types.ObjectId, ref: 'DapUng_MH' }]
});

// Define the 'DapUng_MH' schema
const dapUng_MHSchema = new Schema({
  chiTiet: String
});

// Define the 'Chuong' schema
const chuongSchema = new Schema({
  tenChuong: String,
  noiDung: String
});

// Models
const ChuongTrinh = mongoose.model('ChuongTrinh', chuongTrinhSchema);
const DapUng_CT = mongoose.model('DapUng_CT', dapUng_CTSchema);
const CDR_CT = mongoose.model('CDR_CT', cdr_CTSchema);
const DapUng_CDR = mongoose.model('DapUng_CDR', dapUng_CDRSchema);
const MonHoc = mongoose.model('MonHoc', monHocSchema);
const CDR_MonHoc = mongoose.model('CDR_MonHoc', cdr_MonHocSchema);
const DapUng_MH = mongoose.model('DapUng_MH', dapUng_MHSchema);
const Chuong = mongoose.model('Chuong', chuongSchema);

module.exports = {
  ChuongTrinh,
  DapUng_CT,
  CDR_CT,
  DapUng_CDR,
  MonHoc,
  CDR_MonHoc,
  DapUng_MH,
  Chuong
};
