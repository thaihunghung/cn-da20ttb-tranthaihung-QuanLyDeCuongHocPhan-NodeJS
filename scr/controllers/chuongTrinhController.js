const ChuongTrinh = require('../models/Chuongtrinh/chuongTrinh.model');
const PLOModel = require('../models/Chuongtrinh/PLO.model');
const POModel = require('../models/Chuongtrinh/PO.model');
const dapUng_CTModel = require('../models/Chuongtrinh/dapUng_CT.model');
const TempLate = require('../models/Template/Template');
const Handlebars = require('handlebars');
const {mongooseToObject,MutipleMongooseToObject} = require('../util/mongoose');

exports.ChuongTrinh_GET = async (req, res) => {
    try {
        const PO = await POModel.find({});
        const PLO = await PLOModel.find({});
        const DapungCT = await dapUng_CTModel.find({});
        const chuongTrinh = await ChuongTrinh.find();
        
        // Chuyển đổi sang object
        const posObjects = PO.map(mongooseToObject);
        const ploObjects = PLO.map(mongooseToObject);
        const mappingObjects = DapungCT.map(mongooseToObject);
        const chuongTrinhAsObject = chuongTrinh.map(mongooseToObject);
        
        // Tao group PLO theo loai
        const groupedPLO = ploObjects.reduce((grouped, item) => {
            const key = item.LoaiCDR_CT;
            if (!grouped[key]) {
              grouped[key] = [];
            }
            grouped[key].push(item);
            return grouped;
          }, {});
          
        const DataProgram = {
          chuongTrinh:chuongTrinhAsObject, 
          PO: posObjects,PLO:ploObjects, 
          DapungCT:mappingObjects, 
          GroupLoai: groupedPLO
        }  
        const templates = await TempLate.find().sort({ order: 1 })
          let compiledTemplates = [];
          templates.forEach(template => {
              let compiled;
              switch (template.compileMethod) {
                  case "program":
                      compiled = compileMethod(template.htmlContent, DataProgram);
                      break; 
              }
              compiledTemplates.push(compiled);
          });
      
        let compiledString = compiledTemplates.join(''); 
        res.render('chuongTrinh/chuongTrinh',{
          templates: compiledString
        })
    } catch (error) {
        console.error('Error fetching ChuongTrinh:', error.message);
        res.status(500).send('Internal Server Error');
    }
}

function compileMethod(templateString, data) {
  const compiledTemplate = Handlebars.compile(templateString);
  return compiledTemplate(data);
}

Handlebars.registerHelper('ifMatch', function(idCDR, maMT_CTDT, dapungCT) {
  if (!Array.isArray(dapungCT)) {
    console.error("dapungCT must be an array");
    return '';
  }
  const mapping = dapungCT.find(item => {
    if (!item || !item.id_CDR || !item.MaMT_CTD) {
      console.error("Invalid item:", item);
      return false;
    }
    
    return item.id_CDR.trim() === idCDR.trim() && 
          item.MaMT_CTD.trim() === maMT_CTDT.trim();
  });
  
  if (mapping) {
    return 'X';
  } else {
    return '';
  }
});