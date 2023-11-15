const Chuong  = require('../models/Chuong.model.js')
const NoiDungChiTietChuong = require('../models/NoiDungChiTietChuong.model.js')
const {mongooseToObject}= require('../util/mongoose');
const HocPhan = require('../models/hocPhan.model.js');
// layDuLieuChuongVaNoiDungTheoMonHoc('CS101'); 
async function getLoaiHocPhanByMaMon(maMon) {
  try {
      const hocPhan = await HocPhan.findOne({ MaMon: maMon }, 'LoaiHocPhan').lean();
      return hocPhan ? hocPhan.LoaiHocPhan : null;
  } catch (error) {
      console.error('Error:', error);
      return null;
  }
}

exports.ChuongVaTatCaNoiDung = async (req, res) => {
    try {
    const loaiHocPhan = await getLoaiHocPhanByMaMon('CS101');
    const tatCaChuong = await Chuong.find({ MaMon: 'CS101' });

    // Lấy chi tiết cho từng chương
    const chiTietChuong = await Promise.all(tatCaChuong.map(async (chuong) => {
    const noiDungChuong = await NoiDungChiTietChuong.find({ MaChuong: chuong.MaChuong });
    
      return {
        ...chuong.toObject(),
        NoiDung: noiDungChuong.map((item) => item.toObject())
      };
    }));
        res.render('test/XuatNhieuChuong', { chiTietChuong ,loaiHocPhan});
        // res.json({chiTietChuong})
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};