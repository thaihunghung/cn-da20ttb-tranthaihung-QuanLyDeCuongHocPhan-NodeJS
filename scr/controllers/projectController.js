const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
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
const Auto = require('../models/AautoText/Auto.model');
const DapUngChuongModel = require('../models/HocPhan/DapUngMonHoc.model');
const {verifyToken} = require('../middleware/auth.middleware');
const {mongooseToObject,MutipleMongooseToObject} = require('../util/mongoose');
const { config } = require('dotenv');

exports.index = async (req, res) =>{
    const filename = req.query.filename;
    const token = req.cookies.token;
    try {
      const project = await CreateModel.findOne({ fileName: filename });
      if (project) {
          const plo = await PLO.find();
          if (plo) {
            var plo_Object = plo.map(mongooseToObject)  
          }
          var DataHeader = {
            HocPhan: {
              PhuLuc: '',
              MaMon: '[Mã học phần]',
              TenMon: '[Tên học phần]',
              SoGioTuHoc: '1',
              TH: '1',
              LT: '1',
              MoTa: '[Mô tả học phần]',
              SoTC_LT: '1',
              SoTC_TH: '1',
              TrinhDo_DT: 'Đại học',
              ChuyenNganh: '…………………………………….',
              HocKy: 'I',
              NamHoc: '1',
              Nganh: 'Công nghệ Thông tin',
            }
          };
          var DataDieuKienThamGia = {
            HocPhan: {
              PhuLuc: '',
              MaMon: '[Mã học phần]',
              TenMon: '[Tên học phần]',
              SoGioTuHoc: '1',
              TH: '1',
              LT: '1',
              MoTa: '[Mô tả học phần]',
              SoTC_LT: '1',
              SoTC_TH: '1',
              TrinhDo_DT: 'Đại học',
              ChuyenNganh: '…………………………………….',
              HocKy: 'I',
              NamHoc: '1',
              Nganh: 'Công nghệ Thông tin',
            },
            DieuKien: {
              YC_khac: {
                KienThuc: '[Kiến thức]',
                KyNang: '<div>&nbsp;&nbsp;-&nbsp;&nbsp;[Kỹ năng 1]</div> <div>&nbsp;&nbsp;-&nbsp;&nbsp;[Kỹ năng 2]</div>',
                ThaiDo: '[Thái độ]'
              },
              HocPhan_TQ: '<div class="ModifyTB2"><div class="autocomplete"><span contenteditable="true"></span><span contenteditable="true" id="TenTQ1">Không</span></div><div class="autocomplete"><span contenteditable="true"></span>&nbsp;<span contenteditable="true" id="MaTQ1"></span></div></div>',
              HocPhan_SH: '<span contenteditable="true">Không</span>',
            }
          } 
          var TaiLieuThamKhao = {     
              TaiLieu: [
                {
                  NoiDung: '<div class="giaotrinh TaiLieu section-content text-left" id="giaotrinh1" style="display: flex;"><div class="stt" contenteditable="false">[1]&nbsp;&nbsp;</div> <div><span contenteditable="true">[tên tác giả](năm xuất bản)</span>.&nbsp;<span contenteditable="true" style="font-style: italic;">[tên tài liệu]</span>.&nbsp;<br><span contenteditable="true">[nguồn]</span></div></div>',

                }
              ],
              GiaoTrinh: [
                {
                  NoiDung: '<div class="TaiLieuThamKhao TaiLieu section-content text-left" id="TaiLieuThamKhao1" style="display: flex;"><div class="stt" contenteditable="false">[2]&nbsp;&nbsp;</div> <div><span contenteditable="true">[tên tác giả](năm xuất bản)</span>.&nbsp;<span contenteditable="true" style="font-style: italic;">[tên tài liệu]</span>.&nbsp;<br><span contenteditable="true">[nguồn]</span></div></div>',
                  loaiHocLieu: 'Tài liệu tham khảo',
                }
              ],
              HocLieu: [
                {
                  NoiDung: '<div class="HocLieu TaiLieu section-content text-left" id="HocLieu1" style="display: flex;"><div class="stt" contenteditable="false">[3]&nbsp;&nbsp;</div> <div><span contenteditable="true">[tên tác giả](năm xuất bản)</span>.&nbsp;<span contenteditable="true" style="font-style: italic;">[tên tài liệu]</span>.&nbsp;<br><span contenteditable="true">[nguồn]</span></div></div>',
                  loaiHocLieu: 'Học Liệu',
                }
              ]
          };
          var DataCourseLearningOutcomes = {
            CDR_KT: [
              {
                MaCDR_MH: 1,
                Noidung_CDRMH: 'Trình bày các khái niệm cơ bản về xác suất',
                TrinhDo: '2',
                loaiTUA: 'TUA',
                Ten_CDR: ['PLO1']
              }
            ],
            CDR_KN: [
              {
                MaCDR_MH: 2,
                Noidung_CDRMH: 'Trình bày các khái niệm cơ bản về xác suất',
                TrinhDo: '2',
                loaiTUA: 'TUA',
                Ten_CDR: ['PLO1']
              }
            ],
            CDR_TD: [
              {
                MaCDR_MH: 3,
                Noidung_CDRMH: 'Trình bày các khái niệm cơ bản về xác suất',
                TrinhDo: '2',
                loaiTUA: 'TUA',
                Ten_CDR: ['PLO1']
              }
            ],
            PLO: plo_Object
          };
          var DataCourseContent = {
            Chuong: [
              {
                TenChuong: '[Tên chương]',
                GioLyThuyet: '5',
                GiothucHanh: '5',
                SoGioTuHoc: '5',
                KyNangMem: '1',
                ChiTietChuong: ['1.1. [Chi tiết chương]', '1.2. [Chi tiết chương]'],
                dapUngArray: [1,2,3]
              }
            ]
          };
          var DataTeachingAndLearning = {
            PhuongPhapDayHoc: {
              TenPP: '&nbsp;&nbsp;-&nbsp;&nbsp;Diễn giảng <br> &nbsp;&nbsp;-&nbsp;&nbsp;Vấn đáp (Questions – Answers)<br> &nbsp;&nbsp;-&nbsp;&nbsp;Hoạt động nhóm (Group-based Learning)<br> &nbsp;&nbsp;-&nbsp;&nbsp;Học dựa trên dự án (Project-based Learning)<br> &nbsp;&nbsp;-&nbsp;&nbsp;Thao tác mẫu (Demo)',
            }
          };
          var DataCourseAssessment = {
            DanhGia1: {
              HinhThucDG: '<div contenteditable="true" class="HinhThucDG DG" id="ht1" onkeydown="handleKeyPress(\'ht1\',event)">Kiểm tra lý thuyết hoặc Kiểm tra thực hành </div>',
              TieuChiDG: '<div class="flex_tb5"> <span contenteditable="true" class="TieuChiDG DG">Theo đáp án</span> </div>',
              NoiDungDG: `<div class="NoiDung_DG DG"> Từ <div class="dropdown" id="dropdown-DG1"> <p class="section-content" contenteditable="true" id="DG1">Chương 1</p> <ul class="dropdown-content-chuong"> <li onclick="updateValue('DG1','Chương 1', 'TUA')"> Chương 1 </li> </ul> </div> đến <div class="dropdown" id="dropdown-DG2"> <p class="section-content" contenteditable="true" id="DG2">Chương 1</p> <ul class="dropdown-content-chuong"> <li onclick="updateValue('DG2','Chương 1', 'TUA')"> Chương 1 </li> </ul> </div> </div>`,
              CDRKetThuc: `<div class="CĐR_KetThuc DG"> Từ <div class="dropdown" id="dropdown-KT1"> <span contenteditable="true" id="KT1">1</span> <ul class="dropdown-content-KT7"> <li onclick="updateValue('KT1', '1','TUA')">1</li> <li onclick="updateValue('KT1', '2','TUA')">2</li> <li onclick="updateValue('KT1', '3','TUA')">3</li> </ul> </div> đến <div class="dropdown" id="dropdown-KT2"> <span contenteditable="true" id="KT2">1</span> <ul class="dropdown-content-KT7"> <li onclick="updateValue('KT2', '1','TUA')">1</li> <li onclick="updateValue('KT2', '2','TUA')">2</li> <li onclick="updateValue('KT2', '3','TUA')">3</li> </ul> </div> </div>`,
              Tyle: `<div class="Tyle DG"> <div class="dropdown" id="dropdown-Tyle1"> <span contenteditable="true" id="Tyle1">25</span>% <ul class="dropdown-content"> <li onclick="updateValue('Tyle1', '25','TUA')">25</li> <li onclick="updateValue('Tyle1', '50','TUA')">50</li> <li onclick="updateValue('Tyle1', '75','TUA')">75</li> </ul> </div> </div>`,
            },
            DanhGia2: {
              HinhThucDG: '<div contenteditable="true" class="HinhThucDG DG" id="ht2" onkeydown="handleKeyPress(\'ht2\',event)">Bài tập lớn</div>',
              TieuChiDG: '<div class="flex_tb5" contenteditable="true"> <span contenteditable="true" class="TieuChiDG DG">Theo đáp án</span> </div>',
              NoiDungDG: `<div class="NoiDung_DG DG"> Từ <div class="dropdown" id="dropdown-DG3"> <p class="section-content" contenteditable="true" id="DG3">Chương 1</p> <ul class="dropdown-content-chuong"> <li onclick="updateValue('DG3','Chương 1', 'TUA')"> Chương 1 </li> </ul> </div> đến <div class="dropdown" id="dropdown-DG4"> <p class="section-content" contenteditable="true" id="DG4">Chương 1</p> <ul class="dropdown-content-chuong"> <li onclick="updateValue('DG4','Chương 1', 'TUA')"> Chương 1 </li> </ul> </div> </div>`,
              CDRKetThuc: `<div class="CĐR_KetThuc DG"> Từ <div class="dropdown" id="dropdown-KT3"> <span contenteditable="true" id="KT3">1</span> <ul class="dropdown-content-KT7"> <li onclick="updateValue('KT3', '1','TUA')">1</li> <li onclick="updateValue('KT3', '2','TUA')">2</li> <li onclick="updateValue('KT3', '3','TUA')">3</li> </ul> </div> đến <div class="dropdown" id="dropdown-KT4"> <span contenteditable="true" id="KT4">1</span> <ul class="dropdown-content-KT7"> <li onclick="updateValue('KT4', '1','TUA')">1</li> <li onclick="updateValue('KT4', '2','TUA')">2</li> <li onclick="updateValue('KT4', '3','TUA')">3</li> </ul> </div> </div>`,
              Tyle: `<div class="Tyle DG"> <div class="dropdown" id="dropdown-Tyle2"> <span contenteditable="true" id="Tyle2">25</span>% <ul class="dropdown-content"> <li onclick="updateValue('Tyle2', '25','TUA')">25</li> <li onclick="updateValue('Tyle2', '50','TUA')">50</li> <li onclick="updateValue('Tyle2', '75','TUA')">75</li> </ul> </div> </div>`,
            },
            DanhGia3: {
              HinhThucDG: '<p><span contenteditable="true" class="HinhThucDG DG" id="ht3" onkeydown="handleKeyPress(\'ht3\',event)">Đồ án (nhóm)</span></p>',
              TieuChiDG: '<div contenteditable="true" class="TieuChiDG DG"> Theo đáp án </div>',
              NoiDungDG: `<div class="NoiDung_DG DG"> Từ <div class="dropdown" id="dropdown-DG5"> <p class="section-content" contenteditable="true" id="DG5">Chương 1</p> <ul class="dropdown-content-chuong"> <li onclick="updateValue('DG5','Chương 1', 'TUA')"> Chương 1 </li> </ul> </div> đến <div class="dropdown" id="dropdown-DG6"> <p class="section-content" contenteditable="true" id="DG6">Chương 1</p> <ul class="dropdown-content-chuong"> <li onclick="updateValue('DG6','Chương 1', 'TUA')"> Chương 1 </li> </ul> </div> </div>`,
              CDRKetThuc: `<div class="CĐR_KetThuc DG"> Từ <div class="dropdown" id="dropdown-KT5"> <span contenteditable="true" id="KT5">1</span> <ul class="dropdown-content-KT7"> <li onclick="updateValue('KT5', '1','TUA')">1</li> <li onclick="updateValue('KT5', '2','TUA')">2</li> <li onclick="updateValue('KT5', '3','TUA')">3</li> </ul> </div> đến <div class="dropdown" id="dropdown-KT6"> <span contenteditable="true" id="KT6">1</span> <ul class="dropdown-content-KT7"> <li onclick="updateValue('KT6', '1','TUA')">1</li> <li onclick="updateValue('KT6', '2','TUA')">2</li> <li onclick="updateValue('KT6', '3','TUA')">3</li> </ul> </div> </div>`,
              Tyle: `<div class="Tyle DG"> <div class="dropdown" id="dropdown-Tyle3"> <span contenteditable="true" id="Tyle3">50</span>% <ul class="dropdown-content"> <li onclick="updateValue('Tyle3', '25','TUA')">25</li> <li onclick="updateValue('Tyle3', '50','TUA')">50</li> <li onclick="updateValue('Tyle3', '75','TUA')">75</li> </ul> </div> </div>`,
            },
            DanhGia4: {
              HinhThucDG: '<div contenteditable="true" class="HinhThucDG DG" id="ht4" onkeydown="handleKeyPress(\'ht4\',event)">Thi thực hành</div>',
              TieuChiDG: '<div class="flex_tb5"> <span contenteditable="true" class="TieuChiDG DG">Theo đáp án</span> </div>',
              NoiDungDG: `<div class="NoiDung_DG DG"> Từ <div class="dropdown" id="dropdown-DG7"> <p class="section-content" contenteditable="true" id="DG7">Chương 1</p> <ul class="dropdown-content-chuong"> <li onclick="updateValue('DG7','Chương 1', 'TUA')"> Chương 1 </li> </ul> </div> đến <div class="dropdown" id="dropdown-DG8"> <p class="section-content" contenteditable="true" id="DG8">Chương 1</p> <ul class="dropdown-content-chuong"> <li onclick="updateValue('DG8','Chương 1', 'TUA')"> Chương 1 </li> </ul> </div> </div>`,
              CDRKetThuc: `<div class="CĐR_KetThuc DG"> Từ <div class="dropdown" id="dropdown-KT7"> <span contenteditable="true" id="KT7">1</span> <ul class="dropdown-content-KT7"> <li onclick="updateValue('KT7', '1','TUA')">1</li> <li onclick="updateValue('KT7', '2','TUA')">2</li> <li onclick="updateValue('KT7', '3','TUA')">3</li> </ul> </div> đến <div class="dropdown" id="dropdown-KT8"> <span contenteditable="true" id="KT8">1</span> <ul class="dropdown-content-KT7"> <li onclick="updateValue('KT8', '1','TUA')">1</li> <li onclick="updateValue('KT8', '2','TUA')">2</li> <li onclick="updateValue('KT8', '3','TUA')">3</li> </ul> </div> </div>`,
              Tyle: `<div class="Tyle DG"> <div class="dropdown" id="dropdown-Tyle4"> <span contenteditable="true" id="Tyle4">25</span>% <ul class="dropdown-content"> <li onclick="updateValue('Tyle4', '25','TUA')">25</li> <li onclick="updateValue('Tyle4', '50','TUA')">50</li> <li onclick="updateValue('Tyle4', '75','TUA')">75</li> </ul> </div> </div>`,
            }
          }
          var DataCourseFooter = {
            GiangVien: {
              DsGiangVien: `<div class="autocomplete"> <div class="dropdown" id="dropdown-ChucDanh1"> <span contenteditable="true" id="ChucDanh1">TS</span>:&nbsp; <ul class="dropdown-content"> <li onclick="updateValue('ChucDanh1', 'Ths','TUA')">Ths</li> <li onclick="updateValue('ChucDanh1', 'TS','TUA')">TS</li> <li onclick="updateValue('ChucDanh1', 'PGS','TUA')">PGS</li> </ul> </div> <span contenteditable="true" id="HoTen1" class="">Nguyễn Nhứt Lam</span> </div> <br> <div class="autocomplete"> <div class="dropdown" id="dropdown-ChucDanh2"> <span contenteditable="true" id="ChucDanh2">Ths</span>:&nbsp; <ul class="dropdown-content"> <li onclick="updateValue('ChucDanh2', 'Ths','TUA')">Ths</li> <li onclick="updateValue('ChucDanh2', 'TS','TUA')">TS</li> <li onclick="updateValue('ChucDanh2', 'PGS','TUA')">PGS</li> </ul> </div> <span contenteditable="true" id="HoTen2"> Phạm Thị Trúc Mai </span> </div>`,
              BienSoan: 'Huỳnh Văn Thanh',
              PhanBien: 'Phạm Thị Trúc Mai',
            }
          };
          var templates = await TempLate.find().sort({ order: 1 })
          let compiledTemplates = [];
          var auto = await  Auto.findOne({title: 'autocomplete'})
          
          var autocomplete =  auto.items;
          
          templates.forEach(template => {
              let compiled;
              switch (template.compileMethod) {
                  case "header":
                      compiled = compileMethod(template.htmlContent, DataHeader);
                      break;
                  case "FormGeneral_information":
                      compiled = compileMethod(template.htmlContent, DataDieuKienThamGia);
                      break;    
                  case "formLearningResources":
                      compiled = compileMethod(template.htmlContent, TaiLieuThamKhao);
                      break; 
                  case "CourseDescription":
                      compiled = compileMethod(template.htmlContent, DataHeader);
                      break;    
                  case "FormQuyDinh":  
                      compiled = template.htmlContent
                      break; 
                  case "CourseLearningOutcomes":  
                      compiled = compileMethod(template.htmlContent, DataCourseLearningOutcomes);
                      break;
                  case "CourseContent":  
                      compiled = compileMethod(template.htmlContent, DataCourseContent);
                      break; 
                  case "TeachingAndLearningMethods":  
                      compiled = compileMethod(template.htmlContent, DataTeachingAndLearning);
                      break;     
                  case "CourseAssessment":  
                      compiled = compileMethod(template.htmlContent, DataCourseAssessment);
                      break; 
                  case "Footer":  
                      compiled = compileMethod(template.htmlContent, DataCourseFooter);
                      break;              
              }
              compiledTemplates.push(compiled);
          });
          let compiledString = compiledTemplates.join(''); 
          
          let currentLoaiCDR_CT = null;
          plo_Object.sort((a, b) => {
            if (a.LoaiCDR_CT < b.LoaiCDR_CT) return -1;
            if (a.LoaiCDR_CT > b.LoaiCDR_CT) return 1;
            return 0;
        });

        const processedPLOs = plo_Object.map((plo) => {
          if (plo.LoaiCDR_CT !== currentLoaiCDR_CT) {
              currentLoaiCDR_CT = plo.LoaiCDR_CT;
              return { ...plo, newGroup: true };
          } else {
              return plo;
          }
      });
          res.render('project/project', {
            filename:filename,
            templates: compiledString,
            PLO: plo_Object,
            processedPLOs: processedPLOs,
            token,
            autocomplete
          });
      } else {
          res.redirect('/project/Create');
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
  }
}
exports.User_Create_fileName = (req, res) =>{
  const token = req.cookies.token;
    res.render('project/create_fileName',{token});
}
exports.delete_File_Name =async (req, res) =>{
  try {
    const fileName = req.params.fileName;
        var MaHP = fileName? fileName.trim() : undefined;
        await HocPhanModel.findOneAndDelete({ fileName: MaHP.toString() });
        await GiangVienModel.deleteMany({ MaHP: MaHP });
        await TLTKModel.deleteMany({ MaHP: MaHP });
        await PP_Day_hocModel.deleteMany({ MaHP: MaHP });
        await QuyDinhModel.deleteMany({ MaHP: MaHP });
        await DieuKienThamGiaModel.deleteMany({ MaHP: MaHP });
        await DG_HocPhanModel.deleteMany({ MaHP: MaHP });
        const chuongsToDelete = await ChuongModel.find({ MaHP: MaHP });
        chuongsToDelete.forEach(async (chuong) => {
          await DapUngChuongModel.deleteMany({ MaChuong: chuong.MaChuong });
        });
        await ChuongModel.deleteMany({ MaHP: MaHP });
        const cdrHocPhanIds = await CDR_HocPhanModel.find({ MaHP: MaHP }).distinct('_id');
        await DapUngCDR.deleteMany({ MaCDR_MH: { $in: cdrHocPhanIds } });
        await CDR_HocPhanModel.deleteMany({ MaHP: MaHP });
        await CreateModel.findOneAndDelete({ fileName: fileName });

 res.status(200).json({ message: 'Xóa thành công tất cả các documents.' });
} catch (error) {
    // Xử lý lỗi
    res.status(500).json({ error: 'Lỗi xóa documents', message: error.message });
}
}
exports.Check_File_Name = async (req, res) =>{
    const { filename } = req.body;
    const token = req.cookies.token;
    const {username, role}= jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (!username || !filename || filename.trim() === '') {
      // Trả về lỗi nếu filename không hợp lệ
      res.status(400).json({ success: false, message: 'Tên dự án không được để trống' });
      return;
  }

  const fileNameInCreate = username + ":" + filename;
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

exports.project_Post_Save = async (req, res) => {
    const {
      TaiLieuThamKhaoData,HocLieuData,
      HocPhanData,GiaotrinhData,DieuKienThamGiaData,
      KyNangKTdata,KyNangKNdata,KyNangTDdata,
      ChuongData,PhuongPhapData,
      DanhGiaData,GiangVienData
    } = req.body;
    
    var kyNangKTNoiDung = [];
    var kyNangTDNoiDung = [];
    var kyNangKNNoiDung = [];
  
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
    

   saveCDRHocPhanAndDapUng(KyNangKTdata, kyNangKTNoiDung)
   .then(savedData => {
     //console.log("Dữ liệu đã được lưu thành công:", savedData);
   })
   .catch(error => {
     console.error("Lỗi khi lưu dữ liệu:", error);
   });
   saveCDRHocPhanAndDapUng(KyNangTDdata, kyNangTDNoiDung) 
   .then(savedData => {
     //console.log("Dữ liệu đã được lưu thành công:", savedData);
   })
   .catch(error => {
     console.error("Lỗi khi lưu dữ liệu:", error);
   });
   saveCDRHocPhanAndDapUng(KyNangKNdata, kyNangKNNoiDung) 
   .then(savedData => {
   //console.log("Dữ liệu đã được lưu thành công:", savedData);
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
 
   async function SaveOneDapUngChuong(MaChuong, MaHP, CDR_HocPhanArrays,index) {
   
    let hung = CDR_HocPhanArrays[index];

      for (let j = 0; j < hung.length; j++) {
             const CDR_With_MaHP = await CDR_HocPhanModel.findOne({
                MaCDR_MH: hung[j],
                 MaHP: MaHP
            });
          
             if (CDR_With_MaHP) {
                 const DapUngChuong = new DapUngChuongModel({
                     MaCDR_MH: CDR_With_MaHP._id,
                     MaChuong: MaChuong
                 });
                await DapUngChuong.save();
                 console.log(DapUngChuong);
            } else {
                console.error(`Không tìm thấy CDR với MaHP: ${MaHP} và MaCDR_MH: ${CDR_HocPhanArray[j]}`);
             }
       }
   }  
   var hung = ChuongData.map(async (item,index) => {
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
    await SaveOneDapUngChuong(savedData.MaChuong, savedData.MaHP, CDR_With_CHUONG, index);
     return savedData;
   });

try {
    const SaveHP = new HocPhanModel(HocPhanData);
    const SaveHPSave =await SaveHP.save();
   
    const SaveGT = await TLTKModel.insertMany(TaiLieuThamKhaoData);
    const SaveTL = await TLTKModel.insertMany(HocLieuData);
    const SaveHL = await TLTKModel.insertMany(GiaotrinhData);

    const SaveDKTG = new DieuKienThamGiaModel(DieuKienThamGiaData);
    const SaveDKTGSave =await SaveDKTG.save();
    
    const SavePhuongPhap = new PP_Day_hocModel({
      TenPP: PhuongPhapData.PhuongPhapData.TenPP,
      MaHP: PhuongPhapData.PhuongPhapData.MaHP
    });
    const SavePhuongPhapSave = await SavePhuongPhap.save();
    
    if(DanhGiaData){
       var SaveDanhGia = await DG_HocPhanModel.insertMany(DanhGiaData);
     }
    if(GiangVienData){
      const Save = new GiangVienModel(GiangVienData);
      const SaveSave =await Save.save();
    }  
      
  } catch (error) {
    console.error("Lỗi khi lưu:", error.message);
  }
    
};

exports.project_Delete_PUT = async (req, res) => {
    var MaHP = req.params.MaHP;
    try {
        if(MaHP) {
          await HocPhanModel.findOneAndDelete({ fileName: MaHP });
          await GiangVienModel.deleteMany({ MaHP: MaHP });
          await TLTKModel.deleteMany({ MaHP: MaHP });
          await PP_Day_hocModel.deleteMany({ MaHP: MaHP });
          await QuyDinhModel.deleteMany({ MaHP: MaHP });
          await DieuKienThamGiaModel.deleteMany({ MaHP: MaHP });
          await DG_HocPhanModel.deleteMany({ MaHP: MaHP });

          const chuongsToDelete = await ChuongModel.find({ MaHP: MaHP });
          chuongsToDelete.forEach(async (chuong) => {
            await DapUngChuongModel.deleteMany({ MaChuong: chuong.MaChuong });
          });
          await ChuongModel.deleteMany({ MaHP: MaHP });
          const cdrHocPhanIds = await CDR_HocPhanModel.find({ MaHP: MaHP }).distinct('_id');
          await DapUngCDR.deleteMany({ MaCDR_MH: { $in: cdrHocPhanIds } });
          await CDR_HocPhanModel.deleteMany({ MaHP: MaHP });

        // Xử lý thành công
        res.status(200).json({ message: 'Xóa thành công tất cả các documents.' });
      }
    } catch (error) {
        // Xử lý lỗi
        res.status(500).json({ error: 'Lỗi xóa documents', message: error.message });
    }
}
exports.project_Get_Update = async (req, res) => {
    const token = req.cookies.token;
   //render và load project cần sửa
   const { filename } = req.query;
    
   if (!filename) {
     res.status(400).send('Bad Request');
     return;
   }
   const [username, projectName] = decodeURIComponent(filename).split(':');

   const findName = username+":"+projectName
   var FileName =  findName.toString()
   console.log(FileName)
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
      var DapUng_MH = await findCDRByMaHP(findName.toString())   
      if (DapUng_MH && DapUng_MH.dapUngArray && DapUng_MH.dapUngArray.length === Chuong_Object.length) {
        var ChuongOB = Chuong_Object.map((ch, index) => {
          return { ...ch, dapUngArray: DapUng_MH.dapUngArray[index] };
        });
      } else {
        console.log("Không đủ dữ liệu từ DapUng_MH để gắn vào Chuong_Object");
      }
    }

    // //////////////////////////////////////////////////////////////
    // //                         table 6 
    // //////////////////////////////////////////////////////////////
    const PhuongPhapDayHoc = await PP_Day_hocModel.find({ MaHP: findName.toString()});

    if (PhuongPhapDayHoc[0]) {
      var PhuongPhapDayHoc_Object = PhuongPhapDayHoc[0].toObject();
    }
    const DieuKien = await DieuKienThamGiaModel.find({ MaHP: findName.toString()});
    if (DieuKien[0]) {
      var DieuKienThamGia = DieuKien[0].toObject();
    }

    const DanhGia1 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,MaDG_HP: 'MaDG1',LoaiDG: 'Đánh giá quá trình'})
    if (DanhGia1[0]) {
      var DanhGia1_TH_Object = DanhGia1[0].toObject()
    }
    const DanhGia2 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,MaDG_HP: 'MaDG2',LoaiDG: 'Đánh giá quá trình'})
    if (DanhGia2[0]) {
      var DanhGia2_TH_Object = DanhGia2[0].toObject()
    }
    const DanhGia3 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,MaDG_HP: 'MaDG3',LoaiDG: 'Đánh giá kết thúc học phần'})
    if (DanhGia3[0]) {
      var DanhGia3_TH_Object = DanhGia3[0].toObject()
    }
    const DanhGia4 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,MaDG_HP: 'MaDG4',LoaiDG: 'Đánh giá kết thúc học phần'})
    if (DanhGia4[0]) {
      var DanhGia4_TH_Object = DanhGia4[0].toObject()
    }
 
    const GiangVien = await GiangVienModel.find({MaHP: findName.toString()})

    if (GiangVien[0]) {
      var GiangVien_Object = GiangVien[0].toObject();
    }
    
  
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
          plo_Object.sort((a, b) => {
            if (a.LoaiCDR_CT < b.LoaiCDR_CT) return -1;
            if (a.LoaiCDR_CT > b.LoaiCDR_CT) return 1;
            return 0;
        });

        const processedPLOs = plo_Object.map((plo) => {
          if (plo.LoaiCDR_CT !== currentLoaiCDR_CT) {
              currentLoaiCDR_CT = plo.LoaiCDR_CT;
              return { ...plo, newGroup: true };
          } else {
              return plo;
          }
      });



    var DataCourseLearningOutcomes = {
      CDR_KT : cdrKTWithTenCDR,
      CDR_KN : cdrKNWithTenCDR,
      CDR_TD : cdrTDWithTenCDR,
      PLO :  plo_Object
    }
    
    var DataCourseContent = {
      Chuong: ChuongOB
    }
  
    var DataHeader = {
      HocPhan :hocPhanObject
    }

    var DataDieuKienThamGia = {
      HocPhan :hocPhanObject,
      DieuKien :DieuKienThamGia
    } 

    var DataTeachingAndLearning = {
      PhuongPhapDayHoc : PhuongPhapDayHoc_Object
    }
 

    var DataCourseAssessment = {
      DanhGia1 : DanhGia1_TH_Object,
      DanhGia2 : DanhGia2_TH_Object,
      DanhGia3 : DanhGia3_TH_Object,
      DanhGia4 : DanhGia4_TH_Object
    }

    var DataCourseFooter = {
      GiangVien: GiangVien_Object
    }
    

    const templates = await TempLate.find().sort({ order: 1 })
    let compiledTemplates = [];
    templates.forEach(template => {
        let compiled;
        switch (template.compileMethod) {
            case "header":
                compiled = compileMethod(template.htmlContent, DataHeader);
                break;
            case "FormGeneral_information":
                compiled = compileMethod(template.htmlContent, DataDieuKienThamGia);
                break;    
            case "formLearningResources":
                compiled = compileMethod(template.htmlContent, TaiLieuThamKhao);
                break; 
            case "CourseDescription":
                compiled = compileMethod(template.htmlContent, DataHeader);
                break;    
            case "FormQuyDinh":  
                compiled = template.htmlContent
                break; 
            case "CourseLearningOutcomes":  
                compiled = compileMethod(template.htmlContent, DataCourseLearningOutcomes);
                break;
            case "CourseContent":  
                compiled = compileMethod(template.htmlContent, DataCourseContent);
                break; 
            case "TeachingAndLearningMethods":  
                compiled = compileMethod(template.htmlContent, DataTeachingAndLearning);
                break;     
            case "CourseAssessment":  
                compiled = compileMethod(template.htmlContent, DataCourseAssessment);
                break; 
            case "Footer":  
                compiled = compileMethod(template.htmlContent, DataCourseFooter);
                break;              
        }
        compiledTemplates.push(compiled);
    });

    let compiledString = compiledTemplates.join(''); 
    var auto = await  Auto.findOne({title: 'autocomplete'})    
    var autocomplete =  auto.items;
      
    res.render('project/update',{
      templates: compiledString,
      PLO: plo_Object,
      processedPLOs: processedPLOs,
      findName: findName,
      token,
      autocomplete 
    });
}

exports.project_export_pdf = async (req, res) => {
  const a4Content = req.body.NameValue;
  var findName = a4Content;
  if (!findName) {
    return;
  }
//////////////////////////////////////////////////////////////
    //                         HOCPHAN
    //////////////////////////////////////////////////////////////
    const HocPhan = await HocPhanModel.findOne({fileName: findName.toString()})
    if (HocPhan) {
      var hocPhanObject = HocPhan.toObject();
      var loadLoaiHocPhan = hocPhanObject.LoaiHocPhan;
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
      var DapUng_MH = await findCDRByMaHP(findName.toString())   
      if (DapUng_MH && DapUng_MH.dapUngArray && DapUng_MH.dapUngArray.length === Chuong_Object.length) {
        var ChuongOB = Chuong_Object.map((ch, index) => {
          return { ...ch, dapUngArray: DapUng_MH.dapUngArray[index] };
        });
      } else {
        console.log("Không đủ dữ liệu từ DapUng_MH để gắn vào Chuong_Object");
      }
    }

    // //////////////////////////////////////////////////////////////
    // //                         table 6 
    // //////////////////////////////////////////////////////////////
    const PhuongPhapDayHoc = await PP_Day_hocModel.find({ MaHP: findName.toString()});

    if (PhuongPhapDayHoc[0]) {
      var PhuongPhapDayHoc_Object = PhuongPhapDayHoc[0].toObject();
    }
    const DieuKien = await DieuKienThamGiaModel.find({ MaHP: findName.toString()});
    if (DieuKien[0]) {
      var DieuKienThamGia = DieuKien[0].toObject();
    }

    const DanhGia1 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,MaDG_HP: 'MaDG1',LoaiDG: 'Đánh giá quá trình'})
    if (DanhGia1[0]) {
      var DanhGia1_TH_Object = DanhGia1[0].toObject()
    }
    const DanhGia2 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,MaDG_HP: 'MaDG2',LoaiDG: 'Đánh giá quá trình'})
    if (DanhGia2[0]) {
      var DanhGia2_TH_Object = DanhGia2[0].toObject()
    }
    const DanhGia3 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,MaDG_HP: 'MaDG3',LoaiDG: 'Đánh giá kết thúc học phần'})
    if (DanhGia3[0]) {
      var DanhGia3_TH_Object = DanhGia3[0].toObject()
    }
    const DanhGia4 = await DG_HocPhanModel.find({ MaHP: findName.toString() ,MaDG_HP: 'MaDG4',LoaiDG: 'Đánh giá kết thúc học phần'})
    if (DanhGia4[0]) {
      var DanhGia4_TH_Object = DanhGia4[0].toObject()
    }
 
    const GiangVien = await GiangVienModel.find({MaHP: findName.toString()})

    if (GiangVien[0]) {
      var GiangVien_Object = GiangVien[0].toObject();
    }
    
  
    const CDR_KT = await CDR_HocPhanModel.find({ MaHP: findName.toString(), loai_CDRMH: 'Về kiến thức' }).sort({ MaCDR_MH: 1 });
    if (CDR_KT) {
      var CDR_KT_Object = CDR_KT.map(mongooseToObject)
    }
    const CDR_KN = await CDR_HocPhanModel.find({ MaHP: findName.toString(), loai_CDRMH: 'Về kỹ năng' }).sort({ MaCDR_MH: 1 });
    if (CDR_KN) {
      var CDR_KN_Object = CDR_KN.map(mongooseToObject)
    }
    const CDR_TD = await CDR_HocPhanModel.find({ MaHP: findName.toString(), loai_CDRMH: 'Về thái độ' }).sort({ MaCDR_MH: 1 });
    if (CDR_TD) {
      var CDR_TD_Object = CDR_TD.map(mongooseToObject)
    }

    const cdrKTWithTenCDR = await addTenCDRToCDRObjects(CDR_KT_Object);
    const cdrKNWithTenCDR = await addTenCDRToCDRObjects(CDR_KN_Object);
    const cdrTDWithTenCDR = await addTenCDRToCDRObjects(CDR_TD_Object);
    // async function fetchTenCDR(maCDR_MH) {
    //   try {
    //       const dapUngRecords = await DapUngCDR.find({ MaCDR_MH: maCDR_MH });
    //       return dapUngRecords.map(record => record.Ten_CDR);
    //   } catch (error) {
    //       console.error('Error fetching Ten_CDR:', error);
    //       return [];
    //   }
    // }
    // async function addTenCDRToCDRObjects(cdrObjects) {
    //   return Promise.all(cdrObjects.map(async (cdrObject) => {
    //       const tenCDRList = await fetchTenCDR(cdrObject._id);
    //       return { ...cdrObject, Ten_CDR: tenCDRList };
    //   }));
    // }
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
    
    var DataCourseContent = {
      Chuong: ChuongOB
    }
    
    var DataHeader = {
      HocPhan :hocPhanObject
    }

    var DataDieuKienThamGia = {
      HocPhan :hocPhanObject,
      DieuKien :DieuKienThamGia
    } 

    var DataTeachingAndLearning = {
      PhuongPhapDayHoc : PhuongPhapDayHoc_Object
    }
 

    var DataCourseAssessment = {
      DanhGia1 : DanhGia1_TH_Object,
      DanhGia2 : DanhGia2_TH_Object,
      DanhGia3 : DanhGia3_TH_Object,
      DanhGia4 : DanhGia4_TH_Object
    }

    var DataCourseFooter = {
      GiangVien: GiangVien_Object
    }
    

    const templates = await TempLate.find().sort({ order: 1 })
    let compiledTemplates = [];
    templates.forEach(template => {
        let compiled;
        switch (template.compileMethod) {
            case "header":
                compiled = compileMethod(template.htmlContent, DataHeader);
                break;
            case "FormGeneral_information":
                compiled = compileMethod(template.htmlContent, DataDieuKienThamGia);
                break;    
            case "formLearningResources":
                compiled = compileMethod(template.htmlContent, TaiLieuThamKhao);
                break; 
            case "CourseDescription":
                compiled = compileMethod(template.htmlContent, DataHeader);
                break;    
            case "FormQuyDinh":  
                compiled = template.htmlContent
                break; 
            case "CourseLearningOutcomes":  
                compiled = compileMethod(template.htmlContent, DataCourseLearningOutcomes);
                break;
            case "CourseContent":  
                compiled = compileMethod(template.htmlContent, DataCourseContent);
                break; 
            case "TeachingAndLearningMethods":  
                compiled = compileMethod(template.htmlContent, DataTeachingAndLearning);
                break;     
            case "CourseAssessment":  
                compiled = compileMethod(template.htmlContent, DataCourseAssessment);
                break; 
            case "Footer":  
                compiled = compileMethod(template.htmlContent, DataCourseFooter);
                break;              
        }
        compiledTemplates.push(compiled);
    });

    let compiledString = compiledTemplates.join('');

const cssPath = path.join(__dirname, '../public/pdf/print.css');

var cssContent = fs.readFileSync(cssPath, 'utf-8');

try {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlContent = `<html><head><script>var loadLoaiHocPhan = ${JSON.stringify(loadLoaiHocPhan)};</script><style>${cssContent}</style></head><body>${compiledString}<script>
  function UpdateSTT_TB2() {
      var rows = document.querySelectorAll('.TaiLieu');
      rows.forEach((row, index) => {
          var sttElements = row.querySelectorAll('.stt');
          sttElements.forEach((sttElement, sttIndex) => {
              sttElement.innerHTML = "[" + (index * sttElements.length + sttIndex + 1) + "]&nbsp;&nbsp;";
          });
      });
  }
  UpdateSTT_TB2();
    </script>
    <script>
    function UpdateSTTskill_TB4() {
      var rows = document.querySelectorAll('.KyNang');
      rows.forEach((row, index) => {
        var sttElements = row.querySelectorAll('th');
        sttElements.forEach((sttElement, sttIndex) => {
          // Cập nhật số thứ tự cho tất cả các phần tử có class 'stt'
          sttElement.textContent = index * sttElements.length + sttIndex + 1;
        });
      });
      
    UpdateSTTskill_TB4();
  </script>
  </body></html>`;

  await page.setContent(htmlContent);

  // Đường dẫn đầy đủ đến thư mục 'public/pdf'
  const outputPath = path.join(__dirname, '../public/pdf/output.pdf');

  const pdfOptions = {
    path: outputPath,
    format: 'A4',
    margin: {
      top: '2cm',
      right: '2cm',
      bottom: '2cm',
      left: '3cm',
    },
  };
  // Generate the PDF with specified margins
  await page.pdf(pdfOptions);
  await browser.close();
  res.json({ pdfPath: '/pdf/output.pdf' });
} catch (error) {
  console.error('Error:', error);
  res.status(500).send('Internal Server Error');
}

}
exports.project_export_pdf_CDR =async (req, res) => { 
  const a4Content = req.body.NameValue;
  var findName = a4Content;
  if (!findName) {
    return;
  }
  const CDR_HP = await CDR_HocPhanModel.find({MaHP: findName.toString()}).sort({ MaCDR_MH: 1 })
  const DapUng_Data =await  fetchDataForCDRHocPhanData(CDR_HP);
  const plo = await PLO.find({});
  if (CDR_HP){
  var CDR_HP_OB = CDR_HP.map(mongooseToObject);
  }
  if (DapUng_Data){
  var DapUng = DapUng_Data.map(mongooseToObject);
  }
  if (plo){
  var plo_OB = plo.map(mongooseToObject);
  var groupedCDR = CDR_HP_OB.reduce((grouped, item) => {
                const key = item.loai_CDRMH;
                if (!grouped[key]) {
                  grouped[key] = [];
                }
                grouped[key].push(item);
                return grouped;
      }, {});
  }
  const HocPhan = await HocPhanModel.findOne({fileName: findName.toString()})
    if (HocPhan) {
      var hocPhanObject = HocPhan.toObject();
      var loadLoaiHocPhan = hocPhanObject.LoaiHocPhan;
    }
  const DataPrintPDF = {
    PLO: CDR_HP_OB, 
    PO:plo_OB, 
    DapungCT:DapUng, 
    GroupLoai:groupedCDR,
    HocPhan :hocPhanObject
  }
 
  const templates = await TempLate.find({compileMethod: 'PrintPDF'})
  let compiledTemplates = [];
    templates.forEach(template => {
        let compiled;
        switch (template.compileMethod) {
            case "PrintPDF":
                compiled = compileMethod(template.htmlContent, DataPrintPDF);
                break;         
        }
        compiledTemplates.push(compiled);
    });

    let compiledString = compiledTemplates.join('');

    const cssPath = path.join(__dirname, '../public/pdf/print.css');

    var cssContent = fs.readFileSync(cssPath, 'utf-8');
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const htmlContent = `<html><head><style>${cssContent}</style></head><body>${compiledString}<script></body></html>`;
      await page.setContent(htmlContent);
      // Đường dẫn đầy đủ đến thư mục 'public/pdf'
      const outputPath = path.join(__dirname, '../public/pdf/output_CDR.pdf');  
      const pdfOptions = {
        path: outputPath,
        format: 'A4',
        margin: {
          top: '2cm',
          right: '2cm',
          bottom: '2cm',
          left: '3cm',
        },
      };
      // Generate the PDF with specified margins
      await page.pdf(pdfOptions);
      await browser.close();
      res.json({ pdfPath: '/pdf/output_CDR.pdf' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
}

Handlebars.registerHelper('ifMatchHP', function(idCDR, tenCDR, dapungCT) {
  if (!Array.isArray(dapungCT)) {
    console.error("dapungCT must be an array");
    return '';
  }
  const mapping = dapungCT.find(item => {
    return item.Ten_CDR.trim() === tenCDR.trim() && 
           item.MaCDR_MH.toString() === idCDR.toString();
  });
  
  return mapping ? 'X' : '';
});
Handlebars.registerHelper('inc', function(value, options) {
    return parseInt(value) + 1;
  });
Handlebars.registerHelper('joinArray', function(array) {
    return array.join(', ');
});
Handlebars.registerHelper('calculateColspan', function(array, addValue) { 
    if (!array || !Array.isArray(array)) {
      return addValue; 
  }
  return array.length + addValue;
});
Handlebars.registerHelper('isChecked', function(arg1, arg2) {
    if (arg1 && arg2) {
      return arg1.trim() === arg2.trim();
    }
});
Handlebars.registerHelper('eq', function(arg1, arg2) {
    if (arg1 && arg2) { return arg1.trim() === arg2.trim();}
});
function compileMethod(templateString, data) {
  const compiledTemplate = Handlebars.compile(templateString);
  return compiledTemplate(data);
}
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

  return {DapUng_MH : maCDR_MHs};
}
async function findCDRByMaHP(MaHP) {
  try {
    // Bước 1: Tìm tất cả các Chuong có MaHP
    const chuongList = await ChuongModel.find({ MaHP: MaHP });
  
    let dapUngArray = [];

    // Bước 2 và 3: Lặp qua từng Chuong
    for (const chuong of chuongList) {
      const dapUngChuongs = await DapUngChuongModel.find({ MaChuong: chuong.MaChuong });
      
      let maCDR_MHs = [];
      for (const dapUngChuong of dapUngChuongs) {
        const cdrHocPhan = await CDR_HocPhanModel.findById(dapUngChuong.MaCDR_MH);
        if (cdrHocPhan) {
          maCDR_MHs.push(cdrHocPhan.MaCDR_MH);
        }
      }

      // Thêm mảng MaCDR_MHs vào dapUngArray
     
      dapUngArray.push(maCDR_MHs);
    }

    return {
      dapUngArray
    };
  } catch (error) {
    console.error("Lỗi khi tìm CDR theo MaHP:", error);
    return [];
  }
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
async function fetchDataForCDRHocPhanData(cdrHocPhanData) {
  try {
    const result = [];

    for (let i = 0; i < cdrHocPhanData.length; i++) {
      const _id = cdrHocPhanData[i]._id;
      const dapUngRecords = await DapUngCDR.find({ MaCDR_MH: _id });
      result.push(...dapUngRecords); // Sử dụng spread operator ở đây
    }

    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}