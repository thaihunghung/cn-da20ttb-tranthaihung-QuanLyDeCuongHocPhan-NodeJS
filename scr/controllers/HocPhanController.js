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

    const {GiaotrinhData,TaiLieuThamKhaoData,HocLieuData,HocPhanData,DieuKienThamGiaData,KyNangKTdata,KyNangKNdata,KyNangTDdata,ChuongData,DU_CDR_ChuongData,PhuongPhapData,DanhGiaData,QuyDinhData,GiangVienData} = req.body;
    const maHPValue = 'hung:hung1'; // TÊN TÀI LIỆU THAY ĐỔI 
    //////////////////////////////////////////////////////////////
    //                         HOCPHAN
    //////////////////////////////////////////////////////////////
  
    HocPhanData.fileName = maHPValue;
    //////////////////////////////////////////////////////////////
    //                         TABLE 1
    //////////////////////////////////////////////////////////////
    DieuKienThamGiaData.MaHP = maHPValue;
    /////Cần update lại DieuKienThamGia

    //////////////////////////////////////////////////////////////
    //                         TABLE 2
    //////////////////////////////////////////////////////////////

    // Thêm trường MaHP vào mỗi mục trong mảng dữ liệu
    const MapGT = GiaotrinhData.map(item => ({
      ...item,
      MaHP: maHPValue,
    }));

    const MapTL = TaiLieuThamKhaoData.map(item => ({
      ...item,
      MaHP: maHPValue,
    }));

    const MapHL =  HocLieuData.map(item => ({
      ...item,
      MaHP: maHPValue,
    }));

    //////////////////////////////////////////////////////////////
    //                         TABLE 4
    //////////////////////////////////////////////////////////////
    const MapKNKT =  KyNangKTdata.map(item => ({
      ...item,
      MaHP: maHPValue,
    }));
    const MapKNKN =  KyNangKNdata.map(item => ({
      ...item,
      MaHP: maHPValue,
    }));
    const MapKNTD =  KyNangTDdata.map(item => ({
      ...item,
      MaHP: maHPValue,
    }));

    //////////////////////////////////////////////////////////////
    //                         TABLE 5
    //////////////////////////////////////////////////////////////

    const MapChuong =  ChuongData.map(item => ({
      ...item,
      MaHP: maHPValue,
    }));
   

    //////////////////////////////////////////////////////////////
    //                         TABLE 6
    //////////////////////////////////////////////////////////////
    PhuongPhapData.MaHP = maHPValue;

    //////////////////////////////////////////////////////////////
    //                         TABLE 7
    //////////////////////////////////////////////////////////////
    const MapDanhGia =  DanhGiaData.map(item => ({
      ...item,
      MaHP: maHPValue,
    }));

    //////////////////////////////////////////////////////////////
    //                         TABLE 8
    //////////////////////////////////////////////////////////////
    const MapQuyDinh =  QuyDinhData.map(item => ({
      ...item,
      MaHP: maHPValue,
    }));

    //////////////////////////////////////////////////////////////
    //                         TABLE 9
    //////////////////////////////////////////////////////////////
    const MapGiangVien =  GiangVienData.map(item => ({
      ...item,
      MaHP: maHPValue,
    }));
    console.log(GiangVienData);

  try {
    
    const SaveHP = new HocPhanModel(HocPhanData);
    const SaveHPSave =await SaveHP.save();

    const SaveGT = await TLTKModel.insertMany(MapGT);
    const SaveTL = await TLTKModel.insertMany(MapTL);
    const SaveHL = await TLTKModel.insertMany(MapHL);

    const SaveDKTG = new DieuKienThamGiaModel(DieuKienThamGiaData);
    const SaveDKTGSave =await SaveDKTG.save();
    
    const SaveKNKT = await CDR_HocPhanModel.insertMany(MapKNKT);
    const SaveKNKN = await CDR_HocPhanModel.insertMany(MapKNKN);
    const SaveKNTD = await CDR_HocPhanModel.insertMany(MapKNTD);

    const SaveChuong = await ChuongModel.insertMany(MapChuong);
    
    const SavePhuongPhap = new PP_Day_hocModel(PhuongPhapData);
    const SavePhuongPhapSave = SavePhuongPhap.save();
   
    const SaveDanhGia = await DG_HocPhanModel.insertMany(MapDanhGia);
    const SaveQuyDinh = await QuyDinhModel.insertMany(MapQuyDinh);
    
    const SaveGiangVien = await GiangVienModel.insertMany(MapGiangVien);
    
    
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
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