const mongoose = require('mongoose');
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

exports.HocPhanPostSave = async (req, res) => {
    const { hocPhanData, giangVienData, tltkData, ppDayHocData, quyDinhData, dieuKienThamGiaData, dgHocPhanData, chuongData, cdrHocPhanData } = req.body;
    try {
        // Thêm mới hoặc cập nhật thông tin HocPhan
        const savedHocPhan = await HocPhanModel.findOneAndUpdate(
          { MaMon: hocPhanData.MaMon },
          hocPhanData,
          { upsert: true, new: true }
        );
    
        // Cập nhật thông tin GiangVien
        await GiangVienModel.findOneAndUpdate(
          { MaMon: hocPhanData.MaMon },
          { $set: { giangVienData } },
          { upsert: true, new: true }
        );
    
        // Cập nhật thông tin TLTK
        await TLTKModel.findOneAndUpdate(
          { MaMon: hocPhanData.MaMon },
          { $set: { tltkData } },
          { upsert: true, new: true }
        );
    
        // Cập nhật thông tin PP_Day_hoc
        await PP_Day_hocModel.findOneAndUpdate(
          { MaMon: hocPhanData.MaMon },
          { $set: { ppDayHocData } },
          { upsert: true, new: true }
        );
    
        // Cập nhật thông tin QuyDinh
        await QuyDinhModel.findOneAndUpdate(
          { MaMon: hocPhanData.MaMon },
          { $set: { quyDinhData} },
          { upsert: true, new: true }
        );
    
        // Cập nhật thông tin DieuKienThamGia
        await DieuKienThamGiaModel.findOneAndUpdate(
          { MaMon: hocPhanData.MaMon },
          { $set: { dieuKienThamGiaData } },
          { upsert: true, new: true }
        );
    
        // Cập nhật thông tin DG_HocPhan
        await DG_HocPhanModel.findOneAndUpdate(
          { MaMon: hocPhanData.MaMon },
          { $set: { dgHocPhanData } },
          { upsert: true, new: true }
        );
    
        // Cập nhật thông tin Chuong
        await ChuongModel.findOneAndUpdate(
          { MaMon: hocPhanData.MaMon },
          { $set: { chuongData } },
          { upsert: true, new: true }
        );
    
        // Cập nhật thông tin CDR_HocPhan
        await CDR_HocPhanModel.findOneAndUpdate(
          { MaMon: hocPhanData.MaMon },
          { $set: { cdrHocPhanData } },
          { upsert: true, new: true }
        );
    
        // Trả về thông tin HocPhan đã thêm mới hoặc cập nhật
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