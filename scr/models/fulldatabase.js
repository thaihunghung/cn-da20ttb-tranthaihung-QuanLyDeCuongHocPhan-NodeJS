const mongoose = require('mongoose');





const DapUng_MHSchema = new mongoose.Schema({
  MaCDR_MH: { type: String, required: true },
  MaChuong: { type: mongoose.Schema.Types.String, ref: 'Chuong', required: true },
});

const CDR_MonHocSchema = new mongoose.Schema({
  MaCDR_MH: { type: String, required: true, unique: true },
  MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
  TrinhDo: String,
  Loai_TUA: String,
});

const DapUng_CDRSchema = new mongoose.Schema({
  Ten_CDR: { type: String, required: true },
  MaCDR_MH: { type: mongoose.Schema.Types.String, ref: 'CDR_MonHoc', required: true },
});

const CDR_CTSchema = new mongoose.Schema({
  id_CDR: { type: String, required: true, unique: true },
  id_CT: { type: mongoose.Schema.Types.String, ref: 'ChuongTrinh', required: true },
  Ten_CDR: String,
  LoaiCDR_CT: String,
  NoiDung: String,
});

const ChuongTrinhSchema = new mongoose.Schema({
  id_CT: { type: String, required: true, unique: true },
  TenChuongTrinh: String,
  LoaiHinh: String,
  STC_YeuCau: Number,
  Tg_DaoTao: Number,
  Bac: String,
});

const MucTieuCTDTSchema = new mongoose.Schema({
  MaMT_CTDT: { type: String, required: true, unique: true },
  id_CT: { type: mongoose.Schema.Types.String, ref: 'ChuongTrinh', required: true },
  TenMT_CTDT: String,
  NoiDung: String,
});

const Dapung_CTSchema = new mongoose.Schema({
  MaMT_CTDT: { type: String, required: true },
  id_CDR: { type: mongoose.Schema.Types.String, ref: 'CDR_CT', required: true },
});

// Create models
module.exports = mongoose.model('HocPhan', HocPhanSchema);
module.exports = mongoose.model('Tao', TaoSchema);
module.exports = mongoose.model('Tokens', TokensSchema);
module.exports = mongoose.model('TLTK', TLTKSchema);
module.exports = mongoose.model('PP_Day_hoc', PP_Day_hocSchema);
module.exports = mongoose.model('DieuKienThamGia', DieuKienThamGiaSchema);
module.exports = mongoose.model('QuyDinh', QuyDinhSchema);
module.exports = mongoose.model('GiangVien', GiangVienSchema);
module.exports = mongoose.model('Chuong', ChuongSchema);
module.exports = mongoose.model('NoiDungChiTietChuong', NoiDungChiTietChuongSchema);


module.exports = mongoose.model('CDR_MonHoc', CDR_MonHocSchema);
module.exports = mongoose.model('DapUng_CDR', DapUng_CDRSchema);
module.exports = mongoose.model('CDR_CT', CDR_CTSchema);
module.exports = mongoose.model('ChuongTrinh', ChuongTrinhSchema);
module.exports = mongoose.model('MucTieuCTDT', MucTieuCTDTSchema);
module.exports = mongoose.model('Dapung_CT', Dapung_CTSchema);


// module.exports = {
//   HocPhan,
//   Tao,
//   NguoiDung,
//   Tokens,
//   NguoiDung_Quyen,
//   Quyen,
//   TLTK,
//   PP_Day_hoc,
//   DieuKienThamGia,
//   QuyDinh,
//   GiangVien,
//   Chuong,
//   NoiDungChiTietChuong,
//   DapUng_MH,
//   CDR_MonHoc,
//   DapUng_CDR,
//   CDR_CT,
//   ChuongTrinh,
//   MucTieuCTDT,
//   Dapung_CT
// }