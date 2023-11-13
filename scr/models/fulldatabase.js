const mongoose = require('mongoose');

// Define schemas
const HocPhanSchema = new mongoose.Schema({
  MaMon: { type: String, required: true, unique: true },
  TenMon: String,
  SoGioTuHoc: Number,
  TH: Boolean,
  LT: Boolean,
  MoTa: String,
  LoaiHocPhan: String,
  SoTC_LT: Number,
  SoTC_TH: Number,
  TrinhDo_DT: String,
  ChuyenNganh: String,
  HocKy: Number,
  NamHoc: Number,
});

const TaoSchema = new mongoose.Schema({
  MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
  id_NguoiDung: { type: String, required: true },
});

const NguoiDungSchema = new mongoose.Schema({
  id_NguoiDung: { type: String, required: true, unique: true },
  TenNguoiDung: String,
  TaiKhoan: String,
  MatKhau: String,
});

const TokensSchema = new mongoose.Schema({
  id_Token: { type: String, required: true, unique: true },
  id_NguoiDung: { type: mongoose.Schema.Types.String, ref: 'NguoiDung', required: true },
  token: String,
  ThoiGian: { type: Date, default: Date.now },
});

const NguoiDung_QuyenSchema = new mongoose.Schema({
  id_Quyen: { type: mongoose.Schema.Types.String, ref: 'Quyen', required: true },
  id_NguoiDung: { type: mongoose.Schema.Types.String, ref: 'NguoiDung', required: true },
});

const QuyenSchema = new mongoose.Schema({
  id_Quyen: { type: String, required: true, unique: true },
  Ten_Quyen: String,
});

const TLTKSchema = new mongoose.Schema({
  MaTLTK: { type: String, required: true, unique: true },
  MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
  TenTL: String,
  LoaiTaiLieu: String,
  MoTa: String,
});

const PP_Day_hocSchema = new mongoose.Schema({
  MaPP: { type: String, required: true, unique: true },
  MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
  TenPP: String,
});

const DieuKienThamGiaSchema = new mongoose.Schema({
  MaDK_TG: { type: String, required: true, unique: true },
  MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
  HocPhan_TQ: String,
  HocPhan_SH: String,
  YC_khac: String,
});

const QuyDinhSchema = new mongoose.Schema({
  MaQD: { type: String, required: true, unique: true },
  MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
  NoiDung: String,
  LoaiQD: String,
});

const GiangVienSchema = new mongoose.Schema({
  MaGiangVien: { type: String, required: true, unique: true },
  MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
  HoTen: String,
  ChucDanh: String,
});

const ChuongSchema = new mongoose.Schema({
  MaChuong: { type: String, required: true, unique: true },
  MaMon: { type: mongoose.Schema.Types.String, ref: 'HocPhan', required: true },
  TenChuong: String,
});

const NoiDungChiTietChuongSchema = new mongoose.Schema({
  ID_Noidung: { type: String, required: true, unique: true },
  MaChuong: { type: mongoose.Schema.Types.String, ref: 'Chuong', required: true },
  TenNoiDung: String,
  GioLyThuyet: Number,
  GiothucHanh: Number,
  SoGioTuHoc: Number,
});

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
  id_CDR: { type: String, required: true },
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
module.exports = mongoose.model('NguoiDung', NguoiDungSchema);
module.exports = mongoose.model('Tokens', TokensSchema);
module.exports = mongoose.model('NguoiDung_Quyen', NguoiDung_QuyenSchema);
module.exports = mongoose.model('Quyen', QuyenSchema);
module.exports = mongoose.model('TLTK', TLTKSchema);
module.exports = mongoose.model('PP_Day_hoc', PP_Day_hocSchema);
module.exports = mongoose.model('DieuKienThamGia', DieuKienThamGiaSchema);
module.exports = mongoose.model('QuyDinh', QuyDinhSchema);
module.exports = mongoose.model('GiangVien', GiangVienSchema);
module.exports = mongoose.model('Chuong', ChuongSchema);
module.exports = mongoose.model('NoiDungChiTietChuong', NoiDungChiTietChuongSchema);
module.exports = mongoose.model('DapUng_MH', DapUng_MHSchema);
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