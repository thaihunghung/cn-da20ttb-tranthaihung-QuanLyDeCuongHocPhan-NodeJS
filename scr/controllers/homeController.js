const express = require('express');
const cookieParser = require('cookie-parser');
const TempLate = require('../models/Template/Template');
const Handlebars = require('handlebars');
const {mongooseToObject,MutipleMongooseToObject} = require('../util/mongoose');
const PLO = require('../models/Chuongtrinh/PLO.model');
exports.index =async (req, res) => {
    const plo = await PLO.find();
          if (plo) {
            var plo_Object = plo.map(mongooseToObject)  
          }
          var DataHeader = {
            HocPhan: {
              PhuLuc: '',
              MaMon: '',
              TenMon: '',
              SoGioTuHoc: '',
              TH: '',
              LT: '',
              MoTa: '',
              SoTC_LT: '',
              SoTC_TH: '',
              TrinhDo_DT: '',
              ChuyenNganh: '…………………………………….',
              HocKy: 'I',
              NamHoc: '1',
              Nganh: '',
            }
          };
          var DataDieuKienThamGia = {
            HocPhan: {
              PhuLuc: '',
              MaMon: '',
              TenMon: '',
              SoGioTuHoc: '',
              TH: '',
              LT: '',
              MoTa: '',
              SoTC_LT: '',
              SoTC_TH: '',
              TrinhDo_DT: '',
              ChuyenNganh: '…………………………………….',
              HocKy: '',
              NamHoc: '',
              Nganh: 'Công nghệ Thông tin',
            },
            DieuKien: {
              YC_khac: {
                KienThuc: '',
                KyNang: '',
                ThaiDo: ''
              },
              HocPhan_TQ: '',
              HocPhan_SH: '',
            }
          } 
          var TaiLieuThamKhao = {     
              TaiLieu: [

              ],
              GiaoTrinh: [

              ],
              HocLieu: [
  
              ]
          };
          var DataCourseLearningOutcomes = {
            CDR_KT: [

            ],
            CDR_KN: [

            ],
            CDR_TD: [

            ],
            PLO: plo_Object
          };
          var DataCourseContent = {
            Chuong: [
             
            ]
          };
          var DataTeachingAndLearning = {
            PhuongPhapDayHoc: {
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
       
    });
}
function compileMethod(templateString, data) {
    const compiledTemplate = Handlebars.compile(templateString);
    return compiledTemplate(data);
  }
  Handlebars.registerHelper('inc', function(value, options) {
      return parseInt(value) + 1;
    });
  Handlebars.registerHelper('joinArray', function(array) {
      return array.join(', ');
  });
  
  Handlebars.registerHelper('isChecked', function(arg1, arg2) {
      if (arg1 && arg2) {
        return arg1.trim() === arg2.trim();
      }
  });
  Handlebars.registerHelper('eq', function(arg1, arg2) {
      if (arg1 && arg2) { return arg1.trim() === arg2.trim();}
  });
  