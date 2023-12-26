const ChuongTrinh = require('../models/Chuongtrinh/chuongTrinh.model');
const PLOModel = require('../models/Chuongtrinh/PLO.model');
const POModel = require('../models/Chuongtrinh/PO.model');
const dapUng_CTModel = require('../models/Chuongtrinh/dapUng_CT.model');
const TempLate = require('../models/Template/Template');
const DapUngCDR = require('../models/HocPhan/DapUngCDR.model');
const Handlebars = require('handlebars');
const {mongooseToObject,MutipleMongooseToObject} = require('../util/mongoose');



exports.Admin_index = (req, res) => {
    res.render('admin/HomePageAdmin')
}

exports.Admin_GET_Program =async (req, res) => {
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
        res.render('admin/ProgramGet',{
            chuongTrinh:chuongTrinhAsObject, 
            PO: posObjects,PLO:ploObjects, 
            DapungCT:mappingObjects, 
            GroupLoai: groupedPLO
        })
    } catch (error) {
        console.error('Error fetching ChuongTrinh:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
exports.Admin_Edit_GET_Program =async (req, res) => {
    const chuongTrinh = await ChuongTrinh.find();
    const chuongTrinhAsObject = chuongTrinh.map(mongooseToObject);
 
    res.render('admin/editProgram',{chuongTrinh:chuongTrinhAsObject});
}
exports.Admin_Edit_PUT_Program = async (req, res) => {
  const templateId = req.params.id;
  const updatedData = req.body;

  console.log('Received data:', { templateId, updatedData });
  try {
    const updatedChuongTrinh = await ChuongTrinh.findByIdAndUpdate(templateId, updatedData, { new: true });
  
      if (!updatedChuongTrinh) {
          return res.status(404).json({ error: 'ChuongTrinh not found' });
      }
  
      res.json(updatedChuongTrinh);
  } catch (error) {
      console.error('Error updating ChuongTrinh:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }  
}
exports.Admin_GET_PO = async (req, res) => {
  const PO = await POModel.find({});
  const posObjects = PO.map(mongooseToObject);
  res.render('admin/PO',{PO: posObjects})
}
exports.Admin_POST_PO = async (req, res) => {
  try {
      const { TenMT_CTDT, NoiDung, id_CT, MaMT_CTDT } = req.body;
      const newItem = new POModel({ TenMT_CTDT, NoiDung, id_CT,MaMT_CTDT});
      await newItem.save();
      res.status(201).json({ message: 'New item added', newItem });
  } catch (error) {
      console.error('Error adding new item:', error);
      res.status(500).json({ message: 'Error adding new item', error: error.message });
  }
}
exports.Admin_PUT_PO = async (req, res) => {
  const templateId = req.params.id;
  const updatedData = req.body;

  console.log('Received data:', { templateId, updatedData });
  try {
    const updated = await POModel.findByIdAndUpdate(templateId, updatedData, { new: true });
  
      if (!updated) {
          return res.status(404).json({ error: 'ChuongTrinh not found' });
      }
  
      res.json(updated);
  } catch (error) {
      console.error('Error updating ChuongTrinh:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  } 
}
exports.Admin_DELETE_PO = async (req, res) => {
  try {
    const itemId = req.params.id;
    const FindOne = await POModel.findById(itemId); // Use findById for correct querying
    if (!FindOne) {
      return res.status(404).json({ message: 'Item not found' });
    }
    var maMT = FindOne.MaMT_CTD;
    await dapUng_CTModel.deleteMany({ MaMT_CTD: maMT });
    await POModel.findByIdAndDelete(itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
      res.status(500).send('Error deleting item');
  }
};

exports.Admin_GET_PLO = async (req, res) => {
  const PLO = await PLOModel.find({});
  const ploObjects = PLO.map(mongooseToObject);
  res.render('admin/PLO',{PLO: ploObjects})
}
exports.Admin_POST_PLO = async (req, res) => {
  try {
    const { id_CDR, LoaiCDR_CT, Ten_CDR, NoiDung, id_CT } = req.body;

    const newPLO = new PLOModel({
        id_CDR,
        LoaiCDR_CT,
        Ten_CDR,
        NoiDung,
        id_CT
    });
    await newPLO.save();
    res.status(201).json({ message: 'New PLO item added successfully', newPLO });
} catch (error) {
    console.error('Error adding new PLO item:', error);
    res.status(500).json({ message: 'Error adding new PLO item', error: error.message });
}
}
exports.Admin_PUT_PLO = async (req, res) => {
  const templateId = req.params.id;
  const updatedData = req.body;

  try {
    const FindOnePlo = await PLOModel.findById(templateId);
    if (!FindOnePlo) {
      return res.status(404).json({ message: 'PLO item not found' });
    }
    const oldTenCDR = FindOnePlo.Ten_CDR;
    const updated = await PLOModel.findByIdAndUpdate(templateId, updatedData, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'data not found' });
    }
    await DapUngCDR.updateMany(
      { Ten_CDR: oldTenCDR },
      { $set: { Ten_CDR: updatedData.Ten_CDR } }
    );

    res.json({ message: 'PLO and related DapUng_CDR items updated successfully', updatedPLO: updated });
  } catch (error) {
    console.error('Error updating PLO:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.Admin_DELETE_PLO = async (req, res) => {
  try {
    const itemId = req.params.id;
    const FindOne = await PLOModel.findById(itemId); // Use findById for correct querying
    if (!FindOne) {
      return res.status(404).json({ message: 'Item not found' });
    }
    var maMT = FindOne.id_CDR;
    var Ten_CDR = FindOne.Ten_CDR;
    await dapUng_CTModel.deleteMany({ id_CDR: maMT });
    await DapUngCDR.deleteMany({Ten_CDR: Ten_CDR})
    
    await PLOModel.findByIdAndDelete(itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
      res.status(500).send('Error deleting item');
  }
};


exports.Admin_GET_LIST_USER = async (req, res) => {
  const PLO = await PLOModel.find({});
  const ploObjects = PLO.map(mongooseToObject);
  res.render('admin/PLO',{PLO: ploObjects})
}
exports.Admin_POST_LIST_USER = async (req, res) => {
  try {
    const { id_CDR, LoaiCDR_CT, Ten_CDR, NoiDung, id_CT } = req.body;

    const newPLO = new PLOModel({
        id_CDR,
        LoaiCDR_CT,
        Ten_CDR,
        NoiDung,
        id_CT
    });
    await newPLO.save();
    res.status(201).json({ message: 'New PLO item added successfully', newPLO });
} catch (error) {
    console.error('Error adding new PLO item:', error);
    res.status(500).json({ message: 'Error adding new PLO item', error: error.message });
}
}
exports.Admin_PUT_LIST_USER = async (req, res) => {
  const templateId = req.params.id;
  const updatedData = req.body;

  try {
    const FindOnePlo = await PLOModel.findById(templateId);
    if (!FindOnePlo) {
      return res.status(404).json({ message: 'PLO item not found' });
    }
    const oldTenCDR = FindOnePlo.Ten_CDR;
    const updated = await PLOModel.findByIdAndUpdate(templateId, updatedData, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'data not found' });
    }
    await DapUngCDR.updateMany(
      { Ten_CDR: oldTenCDR },
      { $set: { Ten_CDR: updatedData.Ten_CDR } }
    );

    res.json({ message: 'PLO and related DapUng_CDR items updated successfully', updatedPLO: updated });
  } catch (error) {
    console.error('Error updating PLO:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.Admin_DELETE_LIST_USER = async (req, res) => {
  try {
    const itemId = req.params.id;
    const FindOne = await PLOModel.findById(itemId); // Use findById for correct querying
    if (!FindOne) {
      return res.status(404).json({ message: 'Item not found' });
    }
    var maMT = FindOne.id_CDR;
    var Ten_CDR = FindOne.Ten_CDR;
    await dapUng_CTModel.deleteMany({ id_CDR: maMT });
    await DapUngCDR.deleteMany({Ten_CDR: Ten_CDR})
    
    await PLOModel.findByIdAndDelete(itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
      res.status(500).send('Error deleting item');
  }
};

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





  


