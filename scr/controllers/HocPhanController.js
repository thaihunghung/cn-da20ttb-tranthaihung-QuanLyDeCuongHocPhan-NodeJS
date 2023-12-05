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
    const {Name,GiaotrinhData,TaiLieuThamKhaoData,HocLieuData,HocPhanData,DieuKienThamGiaData,KyNangKTdata,KyNangKNdata,KyNangTDdata,ChuongData,DU_CDR_ChuongData,PhuongPhapData,DanhGiaData,QuyDinhData,GiangVienData} = req.body;
    const maHPValue = Name; // TÊN TÀI LIỆU THAY ĐỔI 
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
  exports.HocPhanDelete = async (req, res) => {
  const MaHP = req.params.MaHP;
  try {
      await HocPhanModel.findOneAndDelete({ fileName: MaHP });
      await GiangVienModel.deleteMany({ MaHP: MaHP });
      await TLTKModel.deleteMany({ MaHP: MaHP });
      await PP_Day_hocModel.deleteMany({ MaHP: MaHP });
      await QuyDinhModel.deleteMany({ MaHP: MaHP });
      await DieuKienThamGiaModel.deleteMany({ MaHP: MaHP });
      await DG_HocPhanModel.deleteMany({ MaHP: MaHP });
      await ChuongModel.deleteMany({ MaHP: MaHP });
      await CDR_HocPhanModel.deleteMany({ MaHP: MaHP });
      // Xử lý thành công
      res.status(200).json({ message: 'Xóa thành công tất cả các documents.' });
  } catch (error) {
      // Xử lý lỗi
      res.status(500).json({ error: 'Lỗi xóa documents', message: error.message });
  }
}