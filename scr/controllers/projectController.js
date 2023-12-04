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
const {mongooseToObject,MutipleMongooseToObject} = require('../util/mongoose');
const { config } = require('dotenv');

exports.index = (req, res) =>{
    res.render('project/project');
}
exports.User_Create_fileName = (req, res) =>{
    res.render('project/create_fileName')
}

exports.Check_File_Name = async (req, res) =>{
    const { filename } = req.body;
    const token = req.cookies.token;
    const {username, role}= jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (username){
      console.log('thanh cong '+username);
      var fileNameInCreate = username + ":"+ filename;
    }
    else{
      console.log('loi');
    }
    try {
        // Kiểm tra xem tên dự án đã tồn tại trong database chưa
        const project = await create.findOne({ fileName: fileNameInCreate });
        if (project) {
            // Tên dự án đã tồn tại
            res.json({ exists: true });
            return;
        } else {
            const data = {
                "fileName": username+":"+filename,
                "username": username
            }
            const Duan = new create(data);
            const saverDuan = await Duan.save();
            //gửi tính hiệu về font end 
            res.json({ exists: false });
            return;
        }
    } catch (error) {
        console.error('Lỗi :', error);
        res.status(500).json({ error: error.message })
    }
};

exports.project_Post_Save = async (req, res) => {
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
};

exports.project_Delete_PUT = async (req, res) => {
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

exports.project_Get_Update = async (req, res) => {
    //render và load project cần sửa
    const { filename } = req.query;
    
    if (!filename) {
      res.status(400).send('Bad Request');
      return;
    }
    const [username, projectName] = decodeURIComponent(filename).split(':');
 
    const findName = username+":"+projectName
    const Create = await CreateModel.findOne({fileName:findName.toString()});
    if (!Create) {
      res.status(400).send('không tồn tại dự án quay lại trang web trước đó!!');
      return;
    }

    //////////////////////////////////////////////////////////////
    //                         HOCPHAN
    //////////////////////////////////////////////////////////////
    const HocPhan = await HocPhanModel.findOne({fileName: findName.toString()})
    if (HocPhan) {
      var hocPhanObject = HocPhan.toObject();
    }
    //////////////////////////////////////////////////////////////
    //                         table 1
    //////////////////////////////////////////////////////////////
    const DieuKien = await DieuKienThamGiaModel.findOne({MaHP: findName.toString()})
    if (DieuKien) {
      var HocPhanTienQuyet = DieuKien.HocPhan_TQ;
      var YeuCauKhac = DieuKien.YC_khac;
      var HocPhanSH = DieuKien.HocPhan_SH;
    }
    //////////////////////////////////////////////////////////////
    //                         table 2
    //////////////////////////////////////////////////////////////
    const TLTK_GT = await TLTKModel.find({ MaHP: findName.toString(), loaiHocLieu: 'Giáo trình' });
    if (TLTK_GT) {
      var TLTK_GT_Object = TLTK_GT.map(mongooseToObject)
    }

    const TLTK_TK = await TLTKModel.find({ MaHP: findName.toString(), loaiHocLieu: 'Tài liệu tham khảo' });
    if (TLTK_TK) {
      var TLTK_TK_Object = TLTK_TK.map(mongooseToObject)
    }

    const TLTK_HL = await TLTKModel.find({ MaHP: findName.toString(), loaiHocLieu: 'Học liệu' });
    if (TLTK_HL) {
      var TLTK_HL_Object = TLTK_HL.map(mongooseToObject)
    }

    //////////////////////////////////////////////////////////////
    //                         table 4
    //////////////////////////////////////////////////////////////
    const CDR_KT = await CDR_HocPhanModel.find({ MaHP: findName.toString(), loai_CDRMH: 'Về kiến thức' });

    if (CDR_KT) {
      var CDR_KT_Object = CDR_KT.map(mongooseToObject)
    }

    const CDR_KN = await CDR_HocPhanModel.find({ MaHP: findName.toString(), loai_CDRMH: 'Về kỹ năng' });
    if (CDR_KN) {
      var CDR_KN_Object = CDR_KN.map(mongooseToObject)
    }
    
    const CDR_TD = await CDR_HocPhanModel.find({ MaHP: findName.toString(), loai_CDRMH: 'Về thái độ' });

    if (CDR_TD) {
      var CDR_TD_Object = CDR_TD.map(mongooseToObject)
    }
    

    //////////////////////////////////////////////////////////////
    //                         table 5
    //////////////////////////////////////////////////////////////
    const Chuong = await ChuongModel.find({ MaHP: findName.toString()});
    if (Chuong) {
      var Chuong_Object = Chuong.map(mongooseToObject)
    }
    //////////////////////////////////////////////////////////////
    //                         table 6 
    //////////////////////////////////////////////////////////////
    const PhuongPhapDayHoc = await PP_Day_hocModel.find({ MaHP: findName.toString()});
    if (PhuongPhapDayHoc) {
      var PhuongPhapDayHoc_Object = PhuongPhapDayHoc.map(mongooseToObject)
    }
    //////////////////////////////////////////////////////////////
    //                         table 7 
    //////////////////////////////////////////////////////////////
    const DanhGia1 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,LoaiDG: 'Đánh giá quá trình', HinhThucDG : 'Kiểm tra lý thuyết hoặc Kiểm tra thực hành'})
    if (DanhGia1) {
      var DanhGia1_TH_Object = DanhGia1.map(mongooseToObject)
    }
    const DanhGia2 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,LoaiDG: 'Đánh giá quá trình', HinhThucDG : 'Bài tập lớn'})
    if (DanhGia2) {
      var DanhGia2_TH_Object = DanhGia2.map(mongooseToObject)
    }
    const DanhGia3 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,LoaiDG: 'Đánh giá kết thúc học phần', HinhThucDG : 'Đồ án (nhóm)'})
    if (DanhGia3) {
      var DanhGia3_TH_Object = DanhGia3.map(mongooseToObject)
    }
    const DanhGia4 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,LoaiDG: 'Đánh giá kết thúc học phần', HinhThucDG : 'Thi thực hành'})
    if (DanhGia4) {
      var DanhGia4_TH_Object = DanhGia4.map(mongooseToObject)
    }
    //////////////////////////////////////////////////////////////
    //                         table 8 
    //////////////////////////////////////////////////////////////
    const QuyDinhThamDu = await QuyDinhModel.find({MaHP: findName.toString() ,LoaiQD: 'Quy định về tham dự lớp học' })
    if (QuyDinhThamDu) {
      var QuyDinhThamDu_Object = QuyDinhThamDu.map(mongooseToObject)
    }

    const QuyDinhHanhVi = await QuyDinhModel.find({MaHP: findName.toString() ,LoaiQD: 'Quy định về hành vi trong lớp học' })
    if (QuyDinhHanhVi) {
      var QuyDinhHanhVi_Object = QuyDinhHanhVi.map(mongooseToObject)
    }

    const QuyDinhHocVu = await QuyDinhModel.find({MaHP: findName.toString() ,LoaiQD: 'Quy định về học vụ' })
    if (QuyDinhHocVu) {
      var QuyDinhHocVu_Object = QuyDinhHocVu.map(mongooseToObject)
    }
    //////////////////////////////////////////////////////////////
    //                         table 9 
    //////////////////////////////////////////////////////////////
    const GiangVien = await GiangVienModel.find({MaHP: findName.toString()})
    console.log(GiangVien)
    if (GiangVien) {
      var GiangVien_Object = GiangVien.map(mongooseToObject)
    }
    res.render('project/update',{
      findName: findName,
      HocPhan : hocPhanObject,
      YeuCauKhac : YeuCauKhac, 
      HocPhanTienQuyet : HocPhanTienQuyet,
      HocPhanSH : HocPhanSH,
      TLTK_GT : TLTK_GT_Object,
      TLTK_TK : TLTK_TK_Object,
      TLTK_HL : TLTK_HL_Object,
      CDR_KT : CDR_KT_Object,
      CDR_KN : CDR_KN_Object,
      CDR_TD : CDR_TD_Object,
      Chuong : Chuong_Object,
      PhuongPhapDayHoc : PhuongPhapDayHoc_Object,
      DanhGia1 : DanhGia1_TH_Object,
      DanhGia2 : DanhGia2_TH_Object,
      DanhGia3 : DanhGia3_TH_Object,
      DanhGia4 : DanhGia4_TH_Object,
      QuyDinhThamDu: QuyDinhThamDu_Object,
      QuyDinhHanhVi: QuyDinhHanhVi_Object,
      QuyDinhHocVu: QuyDinhHocVu_Object,
      GiangVien: GiangVien_Object
    });
}