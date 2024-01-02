const express = require('express');
const cookieParser = require('cookie-parser');
const TempLate = require('../models/Template/Template');
const Handlebars = require('handlebars');
const {mongooseToObject,MutipleMongooseToObject} = require('../util/mongoose');
const PLO = require('../models/Chuongtrinh/PLO.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
app.use(cookieParser());
dotenv.config();
const NguoiDung = require('../models/NguoiDung/NguoiDung.model');
exports.login_get = (req, res, next) => {
    const message = req.query.message || '';
    const token = req.cookies.token;   
    res.render('login/login',{ message ,token});
}
exports.login_post = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    NguoiDung.findOne({ 
        username: username,
        password: password
    })
    .then((data) => {
        if(data) {
           var token = jwt.sign({
            username: data.username,
            role: data.role
           }, process.env.TOKEN_SECRET_KEY)
            // Redirect based on user role
            let redirectUrl = '';
            switch (data.role) {
                case 1:
                    redirectUrl = '/admin';
                    break;
                case 0:
                    redirectUrl = '/home';
                    break;
                default:
                    redirectUrl = '/login'; 
            }
            return res.json({ 
                message: 'Logged in successfully',
                token: token,
                redirectUrl: redirectUrl  
            });  
        } else {
            return res.json('that bai')
        }  
    })
    .catch((err) => {
        res.status(500).json('khong tim thay');
    })   
}
exports.home_get = async (req, res) => {
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
          const processedPLOs = plo_Object.map((plo) => {
          if (plo.LoaiCDR_CT !== currentLoaiCDR_CT) {
              currentLoaiCDR_CT = plo.LoaiCDR_CT;
              return { ...plo, newGroup: true }; 
          }
          return plo;
          }); 
    res.render('home', {
        templates: compiledString,
        PLO: plo_Object,
        processedPLOs: processedPLOs,  }); 
};
exports.process__logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
}



