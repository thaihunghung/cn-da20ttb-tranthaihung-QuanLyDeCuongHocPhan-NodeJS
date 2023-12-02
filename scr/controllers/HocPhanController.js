const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const HocPhanModel = require('../models/HocPhan/hocPhan.model');
const GiangVienModel = require('../models/HocPhan/GiangVien.model');
const TLTKModel = require('../models/HocPhan/TaiLieuThamKhao.model');
const PP_Day_hocModel = require('../models/HocPhan/PP_DayHoc');
const QuyDinhModel = require('../models/HocPhan/QuyDinh.model');
const DieuKienThamGiaModel = require('../models/HocPhan/DieuKienThamGia');
const DG_HocPhanModel = require('../models/HocPhan/DanhGia_HocPhan.model');
const ChuongModel = require('../models/HocPhan/Chuong.model');
const CDR_HocPhanModel = require('../models/HocPhan/Cdr_HocPhan.model')
const CreateModel = require('../models/NguoiDung/Create.model');
const {verifyToken} = require('../middleware/auth.middleware');

exports.HocPhanGet = async (req, res) => {
  res.render('HocPhan');
}
exports.HocPhanPostSave = async (req, res) => {
    const {hocPhanData} = req.body;
    const token = req.cookies.token;
  
  // Verify and get user info
    const {username, role}= jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (username){
      console.log('thanh cong '+username);
    }

    else{
      console.log('loi');
    }
      try {
        const Create = await CreateModel.findOne({ username: username });
        if (!Create) {
          return res.status(404).json({ message: 'Create not found' });
        }
        //gọi fileName từ tb CreateModel sau đó gắn vào json hocPhanData
        const fileName = Create.fileName;
        hocPhanData.fileName = fileName;

        const hocPhanInstance = new HocPhanModel(hocPhanData);
        if (!hocPhanInstance._id) {
          hocPhanInstance._id = new mongoose.Types.ObjectId(); 
        }
        //lấy json học phần đã chỉnh sửa save
        const savedHocPhan = await hocPhanInstance.save();
        res.json({ savedHocPhan });

      } catch (error) {
        console.error('Error saving or updating data:', error.message);
        res.status(500).send('Internal Server Error');
      }
    }
    exports.HocPhanPut = async (req, res) => {
        const maMon = req.params.maMon;
  
        const { hocPhanData, dieuKienThamGiaData, giangVienData } = req.body;
  
     try {
      // Cập nhật thông tin HocPhan
      const updatedHocPhan = await HocPhanModel.findOneAndUpdate(
        { MaMon: maMon },
        { $set: hocPhanData },
        { new: true }
      );
  
      // Cập nhật thông tin DieuKienThamGia
      await DieuKienThamGiaModel.findOneAndUpdate(
        { MaMon: maMon },
        { $set: dieuKienThamGiaData },
        { new: true, upsert: true } // upsert: true để tạo mới nếu chưa tồn tại
      );
  
      // Cập nhật thông tin GiangVien
      await GiangVienModel.findOneAndUpdate(
        { MaMon: maMon },
        { $set: giangVienData },
        { new: true, upsert: true } // upsert: true để tạo mới nếu chưa tồn tại
      );
  
      // Trả về thông tin HocPhan đã cập nhật
      res.json({ updatedHocPhan });
            } catch (error) {
      console.error('Error updating data:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };


  exports.HocPhanDelete = async (req, res) => {
    const maMon = req.params.maMon;
  
    try {
       // Xóa thông tin HocPhan
    const deletedHocPhan = await HocPhanModel.findOneAndDelete({ MaMon: maMon });

    // Xóa thông tin GiangVien
    await GiangVienModel.findOneAndDelete({ MaMon: maMon });

    // Xóa thông tin TLTK
    await TLTKModel.findOneAndDelete({ MaMon: maMon });

    // Xóa thông tin PP_Day_hoc
    await PP_Day_hocModel.findOneAndDelete({ MaMon: maMon });

    // Xóa thông tin QuyDinh
    await QuyDinhModel.findOneAndDelete({ MaMon: maMon });

    // Xóa thông tin DieuKienThamGia
    await DieuKienThamGiaModel.findOneAndDelete({ MaMon: maMon });

    // Xóa thông tin DG_HocPhan
    await DG_HocPhanModel.findOneAndDelete({ MaMon: maMon });

    // Xóa thông tin Chuong
    await ChuongModel.findOneAndDelete({ MaMon: maMon });

    // Xóa thông tin CDR_HocPhan
    await CDR_HocPhanModel.findOneAndDelete({ MaMon: maMon });

    // Trả về thông tin HocPhan đã xóa
      res.json({ deletedHocPhan });
    } catch (error) {
      console.error('Error deleting data:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };