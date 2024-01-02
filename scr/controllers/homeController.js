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
             
            ]
          };
          var DataTeachingAndLearning = {
            PhuongPhapDayHoc: {
            }
          };
          var DataCourseAssessment = {
           
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
    const token = req.cookies.token;   
    res.render('home', {
        templates: compiledString,
        PLO: plo_Object,
      processedPLOs: processedPLOs,
      token
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
  