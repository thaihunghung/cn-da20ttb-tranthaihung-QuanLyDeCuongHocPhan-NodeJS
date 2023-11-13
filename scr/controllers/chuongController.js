const Chuong  = require('../models/Chuong.model.js')
const NoiDungChiTietChuong = require('../models/NoiDungChiTietChuong.model.js')
const {mongooseToObject}= require('../util/mongoose');
// Hàm lấy chi tiết chương và nội dung
async function layChiTietChuongVaNoiDung(chuong) {
    const noiDungChuong = await NoiDungChiTietChuong.find({ MaChuong: chuong.MaChuong });
    return {
      ...chuong.toObject(),
      NoiDung: noiDungChuong.map((item) => item.toObject())
    };
  }
// Hàm lấy dữ liệu chi tiết của chương
async function layChiTietChuongVaNoiDung(maMonHoc) {
    try {
      // Lấy tất cả Chương cho một Môn Học cụ thể
      const tatCaChuong = await Chuong.find({ MaMon: maMonHoc });
  
      // Lặp qua từng chương và lấy chi tiết nội dung
      const chiTietChuong = await Promise.all(tatCaChuong.map(async (chuong) => {
        // Sử dụng populate để nối dữ liệu từ mô hình NoiDungChiTietChuong
        const noiDungChuong = await NoiDungChiTietChuong.find({ MaChuong: chuong.MaChuong });
  
        // Trả về đối tượng chứa thông tin về chương và chi tiết nội dung
        return {
          ...chuong.toObject(),
          NoiDung: noiDungChuong.map((item) => item.toObject())
        };
      }));
  
      // Hiển thị kết quả chi tiết
      chiTietChuong.forEach((chuong) => {
        console.log('Chương:');
        logChiTiet(chuong);
        chuong.NoiDung.forEach((noiDung) => {
          console.log('Nội Dung:');
          logChiTiet(noiDung);
        });
      });
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu chi tiết:', error);
    } 
}
  
  // Hàm đệ quy để log đối tượng chi tiết
  function logChiTiet(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        console.log(`${key}:`);
        logChiTiet(obj[key]);
      } else {
        console.log(`${key}: ${obj[key]}`);
      }
    }
  }
  

// layDuLieuChuongVaNoiDungTheoMonHoc('CS101'); 
exports.ChuongVaTatCaNoiDung = async (req, res) => {
    try {
        const tatCaChuong = await Chuong.find({ MaMon: 'CS101' });

    // Lấy chi tiết cho từng chương
    const chiTietChuong = await Promise.all(tatCaChuong.map(async (chuong) => {
      const noiDungChuong = await NoiDungChiTietChuong.find({ MaChuong: chuong.MaChuong });
      return {
        ...chuong.toObject(),
        NoiDung: noiDungChuong.map((item) => item.toObject())
      };
    }));
        res.render('test/XuatNhieuChuong',{ chiTietChuong });
        // res.json({chiTietChuong})
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};