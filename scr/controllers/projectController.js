const mongoose = require('mongoose');
const Handlebars = require('handlebars');

const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const HocPhanModel = require('../models/HocPhan/hocPhan.model');
const GiangVienModel = require('../models/HocPhan/GiangVien.model');
const TLTKModel = require('../models/HocPhan/TaiLieuThamKhao.model');
const TempLate = require('../models/Template/Template');
const PP_Day_hocModel = require('../models/HocPhan/PP_DayHoc');
const QuyDinhModel = require('../models/HocPhan/QuyDinh.model');
const DieuKienThamGiaModel = require('../models/HocPhan/DieuKienThamGia');
const DG_HocPhanModel = require('../models/HocPhan/DanhGia_HocPhan.model');
const ChuongModel = require('../models/HocPhan/Chuong.model');
const CDR_HocPhanModel = require('../models/HocPhan/Cdr_HocPhan.model')
const DapUngCDR = require('../models/HocPhan/DapUngCDR.model');
const CreateModel = require('../models/NguoiDung/Create.model');
const PLO = require('../models/Chuongtrinh/PLO.model');
const DapUngChuongModel = require('../models/HocPhan/DapUngMonHoc.model');
const {verifyToken} = require('../middleware/auth.middleware');
const {mongooseToObject,MutipleMongooseToObject} = require('../util/mongoose');
const { config } = require('dotenv');

async function fetchTenCDR(maCDR_MH) {
  try {
      const dapUngRecords = await DapUngCDR.find({ MaCDR_MH: maCDR_MH });
      return dapUngRecords.map(record => record.Ten_CDR);
  } catch (error) {
      console.error('Error fetching Ten_CDR:', error);
      return [];
  }
}
async function addTenCDRToCDRObjects(cdrObjects) {
  return Promise.all(cdrObjects.map(async (cdrObject) => {
      const tenCDRList = await fetchTenCDR(cdrObject._id);
      return { ...cdrObject, Ten_CDR: tenCDRList };
  }));
}
async function findMaCDRMHFromCDRHocPhan(dapUngArrays) {
  let maCDR_MHs = [];

  for (let array of dapUngArrays) {
    let maCDRs = [];

    for (let id of array) {
      let cdrHocPhan = await CDR_HocPhanModel.findById(id);
      if (cdrHocPhan) {
        maCDRs.push(cdrHocPhan.MaCDR_MH);
      } else {
        console.error(`CDR_HocPhan không tìm thấy với _id: ${id}`);
      }
    }

    maCDR_MHs.push(maCDRs);
  }

  return maCDR_MHs;
}



exports.index = async (req, res) =>{
    const filename = req.query.filename;
    try {
      const project = await CreateModel.findOne({ fileName: filename });
      if (project) {
          res.render('project/project', {filename:filename});
      } else {
          res.redirect('/project/Create');
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
  }
}
exports.User_Create_fileName = (req, res) =>{
    res.render('project/create_fileName')
}
exports.delete_File_Name =async (req, res) =>{
    const fileName = req.params.fileName;
    try {
    await CreateModel.findOneAndDelete({ fileName: fileName });
    } catch (error) {
    // Xử lý lỗi
    res.status(500).json({ error: 'Lỗi xóa documents', message: error.message });
}
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
        const project = await CreateModel.findOne({ fileName: fileNameInCreate });
        if (project) {
            // Tên dự án đã tồn tại
            res.json({ exists: true });
            return;
        } else {

            const data = {
                "fileName": username+":"+filename,
                "username": username
            }
            const Duan = new CreateModel(data);
            const saverDuan = await Duan.save();
            
            //gửi tính hiệu về font end 
            res.json({ exists: false, data: fileNameInCreate});
            return;
        }
    } catch (error) {
        console.error('Lỗi :', error);
        res.status(500).json({ error: error.message })
    }
};
// const {KyNangKTdata,KyNangKNdata,KyNangTDdata} = req.body;
    // const KyNangKTdataWithMaHP = KyNangKTdata.map(item => ({ ...item, MaHP: maHPValue }));

    

    //save mấy kỷ năng trước sau đó tìm ra _id của nó sau đó 
    //save tương ứng với da[ung]
    // console.log(KyNangKTdataWithMaHP)
    // let dapUngValues;
    // if (KyNangKTdata.length > 0) {
    //   dapUngValues = KyNangKTdata.map(item => {
    //     const dapUngValue = item.DapUng_CDRMH.split(',').map(value => value.trim());
    //     delete item.DapUng_CDRMH;
    //     return dapUngValue;
    //   });
    // } else {
    //   console.log('Mảng KyNangKTdata không có phần tử.');
    // }
    
    //HocPhanData.fileName = maHPValue;



    //DieuKienThamGiaData.MaHP = maHPValue;
    /////Cần update lại DieuKienThamGia

    
    // const MapKNKT =  KyNangKTdata.map(item => ({
    //   ...item,
    //   MaHP: maHPValue,
    // }));
    // const MapKNKN =  KyNangKNdata.map(item => ({
    //   ...item,
    //   MaHP: maHPValue,
    // }));
    // const MapKNTD =  KyNangTDdata.map(item => ({
    //   ...item,
    //   MaHP: maHPValue,
    // }));



    // const MapChuong =  ChuongData.map(item => ({
    //   ...item,
    //   MaHP: maHPValue,
    // }));
   


    //PhuongPhapData.MaHP = maHPValue;


    // const MapDanhGia =  DanhGiaData.map(item => ({
    //   ...item,
    //   MaHP: maHPValue,
    // }));

   
    // const MapQuyDinh =  QuyDinhData.map(item => ({
    //   ...item,
    //   MaHP: maHPValue,
    // }));

    //////////////////////////////////////////////////////////////
    //                         TABLE 9
    //////////////////////////////////////////////////////////////
    // const MapGiangVien =  GiangVienData.map(item => ({
    //   ...item,
    //   MaHP: maHPValue,
    // }));
exports.project_Post_Save = async (req, res) => {
    const {GiaotrinhData, Name,TaiLieuThamKhaoData,HocLieuData,HocPhanData,DieuKienThamGiaData,KyNangKTdata,KyNangKNdata,KyNangTDdata,ChuongData,DU_CDR_ChuongData,PhuongPhapData,DanhGiaData,QuyDinhData,GiangVienData} = req.body;
    
    
  
    var maHPValue = 1;
    var kyNangKTNoiDung = [];
    var kyNangTDNoiDung = [];
    var kyNangKNNoiDung = [];
    let value1;
var maHP = 'hung:1';








  for (var i = 0; i < KyNangKTdata.length; i++) {
    var DapUng = KyNangKTdata[i].DapUng_CDRMH;
    kyNangKTNoiDung.push(DapUng);
    delete KyNangKTdata[i].DapUng_CDRMH;
  }
    // Xử lý dữ liệu cho KyNangKNdata
  for (var i = 0; i < KyNangKNdata.length; i++) {
    var DapUngKN = KyNangKNdata[i].DapUng_CDRMH;
    kyNangKNNoiDung.push(DapUngKN);
    delete KyNangKNdata[i].DapUng_CDRMH;
  }

 // Xử lý dữ liệu cho KyNangTDdata
  for (var i = 0; i < KyNangTDdata.length; i++) {
    var DapUngTD = KyNangTDdata[i].DapUng_CDRMH;
    kyNangTDNoiDung.push(DapUngTD);
    delete KyNangTDdata[i].DapUng_CDRMH;
  }
  async function SaveOneDapUng(data, index,noiDungArray) {
    const hung = noiDungArray[index];
  
    for (let i = 0; i < hung.length; i++) {
        const DapUng_CDRData = new DapUngCDR({
            Ten_CDR: hung[i],
            MaCDR_MH: data,
        });
        await DapUng_CDRData.save();
    }
  } 
  async function saveCDRHocPhanAndDapUng(data,noiDungArray) {
    const savedCDRHocPhanData = await Promise.all(
      data.map(async (item, index) => {
        const cdrHocPhanData = new CDR_HocPhanModel({
          MaCDR_MH: item.MaCDR_MH, 
          MaHP: item.MaHP,
          loai_CDRMH: item.loai_CDRMH,
          Noidung_CDRMH: item.Noidung_CDRMH,
          TrinhDo: item.TrinhDo,
          loaiTUA: item.loaiTUA,
        });
        const savedData = await cdrHocPhanData.save();
        await SaveOneDapUng(savedData._id, index, noiDungArray);
        return savedData;
      })
    );
  
    return savedCDRHocPhanData;
  }

  saveCDRHocPhanAndDapUng(KyNangKTdata, kyNangKTNoiDung)
  .then(savedData => {
    console.log("Dữ liệu đã được lưu thành công:", savedData);
  })
  .catch(error => {
    console.error("Lỗi khi lưu dữ liệu:", error);
  });
  saveCDRHocPhanAndDapUng(KyNangTDdata, kyNangTDNoiDung) 
  .then(savedData => {
    console.log("Dữ liệu đã được lưu thành công:", savedData);
  })
  .catch(error => {
    console.error("Lỗi khi lưu dữ liệu:", error);
  });
  saveCDRHocPhanAndDapUng(KyNangKNdata, kyNangKNNoiDung) 
  .then(savedData => {
    console.log("Dữ liệu đã được lưu thành công:", savedData);
  })
  .catch(error => {
    console.error("Lỗi khi lưu dữ liệu:", error);
  });





var CDR_With_CHUONG = [];
  for (var i = 0; i < ChuongData.length; i++) {
      var DapUngChuong = ChuongData[i].DapUng_MH;
      CDR_With_CHUONG.push(DapUngChuong);
      delete ChuongData[i].DapUng_CDRMH;
  }
  async function SaveOneDapUngChuong(MaChuong, MaHP, CDR_HocPhanArrays) {
    for (let i = 0; i < CDR_HocPhanArrays.length; i++) {
        let CDR_HocPhanArray = CDR_HocPhanArrays[i];
        for (let j = 0; j < CDR_HocPhanArray.length; j++) {
            const CDR_With_MaHP = await CDR_HocPhanModel.findOne({
                MaCDR_MH: CDR_HocPhanArray[j]
            });

            if (CDR_With_MaHP) {
                const DapUngChuong = new DapUngChuongModel({
                    MaCDR_MH: CDR_With_MaHP._id,
                    MaChuong: MaChuong
                });
                await DapUngChuong.save();
            } else {
                console.error(`Không tìm thấy CDR với MaHP: ${MaHP} và MaCDR_MH: ${CDR_HocPhanArray[j]}`);
            }
        }
    }
}
  
  const hung = ChuongData.map(async (item) => {
    const Chuong = new ChuongModel({
      MaHP: item.MaHP,
      TenChuong: item.TenChuong,
      GioLyThuyet: item.GioLyThuyet,
      GiothucHanh: item.GiothucHanh,
      SoGioTuHoc: item.SoGioTuHoc,
      KyNangMem: item.KyNangMem,
      ChiTietChuong: item.ChiTietChuong
    });
    const savedData = await Chuong.save();
    await SaveOneDapUngChuong(savedData.MaChuong, savedData.MaHP, CDR_With_CHUONG);
    return savedData;
  });
  



    
    // const SaveHP = new HocPhanModel(HocPhanData);
    // const SaveHPSave =await SaveHP.save();
   
    //const SaveGT = await TLTKModel.insertMany(TaiLieuThamKhaoData);
   // const SaveTL = await TLTKModel.insertMany(HocLieuData);
   // const SaveHL = await TLTKModel.insertMany(GiaotrinhData);

    // const SaveDKTG = new DieuKienThamGiaModel(DieuKienThamGiaData);
    // const SaveDKTGSave =await SaveDKTG.save();
    
    // const SaveKNKT = await CDR_HocPhanModel.insertMany(MapKNKT);
    // const SaveKNKN = await CDR_HocPhanModel.insertMany(MapKNKN);
    // const SaveKNTD = await CDR_HocPhanModel.insertMany(MapKNTD);
    // if(ChuongData){
    //   const SaveChuong = await ChuongModel.insertMany(ChuongData);
    // }
    // const SavePhuongPhap = new PP_Day_hocModel(PhuongPhapData);
    // const SavePhuongPhapSave = SavePhuongPhap.save();
   
    // const SaveDanhGia = await DG_HocPhanModel.insertMany(MapDanhGia);
    // const SaveQuyDinh = await QuyDinhModel.insertMany(MapQuyDinh);
    
    // const SaveGiangVien = await GiangVienModel.insertMany(MapGiangVien);
    async function findDapUngByMaHP(MaHP) {
      try {
        const chuongList = await ChuongModel.find({ MaHP: MaHP });
        let dapUngArrays = [];
    
        for (const chuong of chuongList) {
          const dapUngChuongs = await DapUngChuongModel.find({ MaChuong: chuong.MaChuong });
          let maCDR_MHs = [];
    
          for (const dapUngChuong of dapUngChuongs) {
            let cdrHocPhan = await CDR_HocPhanModel.findById(dapUngChuong.MaCDR_MH);
            if (cdrHocPhan) {
              maCDR_MHs.push(cdrHocPhan.MaCDR_MH);
            } else {
              console.error(`Không tìm thấy CDR_HocPhan với _id: ${dapUngChuong.MaCDR_MH}`);
            }
          }
    
          dapUngArrays.push(maCDR_MHs);
        }
    
        return dapUngArrays;
      } catch (error) {
        console.error("Lỗi khi tìm DapUng theo MaHP:", error);
        return [];
      }
    }
    
    findDapUngByMaHP('hung:1').then(dapUngArrays => {
      console.log("Mảng các MaCDR_MH tương ứng với mỗi Chuong:", dapUngArrays);
    });
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
  function compileMethod(templateString, data) {
    // Biên dịch template
    const compiledTemplate = Handlebars.compile(templateString);
    return compiledTemplate(data);
}

  Handlebars.registerHelper('inc', function(value, options) {
    return parseInt(value) + 1;
  });
  Handlebars.registerHelper('joinArray', function(array) {
    return array.join(', ');
  });
  var findName='hung:1';


  //////////////////////////////////////////////////////////////
    //                         HOCPHAN
    //////////////////////////////////////////////////////////////
    const HocPhan = await HocPhanModel.findOne({fileName: findName.toString()})
    if (HocPhan) {
      var hocPhanObject = HocPhan.toObject();
      var loadLoaiHocPhan = HocPhan.LoaiHocPhan;
    }
      const TLTK_GT = await TLTKModel.find({ MaHP: findName.toString(), loaiHocLieu: 'Giáo trình' });
        if (TLTK_GT) {
          var TLTK_GT_Object = TLTK_GT.map(mongooseToObject)
        }
      const TLTK_TK = await TLTKModel.find({ MaHP: findName.toString(), loaiHocLieu: 'Tài liệu tham khảo' });
        if (TLTK_TK) {
          var TLTK_TK_Object = TLTK_TK.map(mongooseToObject)
        }
      const TLTK_HL = await TLTKModel.find({ MaHP: findName.toString(), loaiHocLieu: 'Học Liệu' });
      if (TLTK_HL) {
          var TLTK_HL_Object = TLTK_HL.map(mongooseToObject)
      }
        
      const TaiLieuThamKhao = {
        TaiLieu: TLTK_GT_Object,
        GiaoTrinh:TLTK_TK_Object,
        HocLieu: TLTK_HL_Object
      }
  //////////////////////////////////////////////////////////////
    //                         table 5
    //////////////////////////////////////////////////////////////
    const Chuong = await ChuongModel.find({ MaHP: findName.toString()});
    if (Chuong) {
      var Chuong_Object = Chuong.map(mongooseToObject)
    }

  
    // //////////////////////////////////////////////////////////////
    // //                         table 6 
    // //////////////////////////////////////////////////////////////
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

  

    const GiangVien = await GiangVienModel.find({MaHP: findName.toString()})

    if (GiangVien) {
      var GiangVien_Object = GiangVien.map(mongooseToObject)
    }



    //render và load project cần sửa
    const { filename } = req.query;
    
    if (!filename) {
      res.status(400).send('Bad Request');
      return;
    }
    const [username, projectName] = decodeURIComponent(filename).split(':');
 
    //const findName = username+":"+projectName
    
    const Create = await CreateModel.findOne({fileName:findName.toString()});
    if (!Create) {
      res.status(400).send('không tồn tại dự án quay lại trang web trước đó!!');
      return;
    }
    //var FileName =  findName.toString()
    //console.log(FileName)
  

   
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



      const cdrKTWithTenCDR = await addTenCDRToCDRObjects(CDR_KT_Object);
      const cdrKNWithTenCDR = await addTenCDRToCDRObjects(CDR_KN_Object);
      const cdrTDWithTenCDR = await addTenCDRToCDRObjects(CDR_TD_Object);


    const plo = await PLO.find();
    if (plo) {
      var plo_Object = plo.map(mongooseToObject)  
    }
    let currentLoaiCDR_CT = null;
    const processedPLOs = plo_Object.map((plo) => {
    if (plo.LoaiCDR_CT !== currentLoaiCDR_CT) {
        currentLoaiCDR_CT = plo.LoaiCDR_CT;
        return { ...plo, newGroup: true }; // Đánh dấu đây là một nhóm mới
    }
    return plo;
    });
    var DataCourseLearningOutcomes = {
      CDR_KT : cdrKTWithTenCDR,
      CDR_KN : cdrKNWithTenCDR,
      CDR_TD : cdrTDWithTenCDR,
      PLO :  plo_Object
    }
    const templates = await TempLate.find().sort({ order: 1 })
    let compiledTemplates = [];
    templates.forEach(template => {
        let compiled;
        switch (template.compileMethod) {
            case "header":
                compiled = compileMethod(template.htmlContent, DataHeader);
                break;
            case "detail1":
                compiled = compileMethod(template.htmlContent, DataHeader);
                break;    
            case "detail2":
                compiled = compileMethod(template.htmlContent, TaiLieuThamKhao);
                break; 
            case "detail3":
                compiled = compileMethod(template.htmlContent, DataHeader);
                break;    
            case "detail8":  
                compiled =  template.htmlContent
                break; 
            case "CourseLearningOutcomes":  
                compiled =  compileMethod(template.htmlContent, DataCourseLearningOutcomes);
                break;    
        }
        compiledTemplates.push(compiled);
    });


    var DataHeader = {
      HocPhan :hocPhanObject
  }   
  var DataDieuKienThamGia = {
      HocPhan :hocPhanObject,
  } 

 console.log(Chuong_Object);
    let compiledString = compiledTemplates.join('');
    
    res.render('project/update',{
     
      templates: compiledString,
      PLO: plo_Object,
      processedPLOs: processedPLOs,
      Chuong : Chuong_Object,
    });

  


   

    
    //findName: findName,
      //PLO: plo_Object,
      
      //processedPLOs: processedPLOs,



      // PhuongPhapDayHoc : PhuongPhapDayHoc_Object,
      // DanhGia1 : DanhGia1_TH_Object,
      // DanhGia2 : DanhGia2_TH_Object,
      // DanhGia3 : DanhGia3_TH_Object,
      // DanhGia4 : DanhGia4_TH_Object,
      // GiangVien: GiangVien_Object
}
