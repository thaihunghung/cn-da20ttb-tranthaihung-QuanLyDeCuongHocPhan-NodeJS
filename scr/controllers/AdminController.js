const ChuongTrinh = require('../models/Chuongtrinh/chuongTrinh.model');
const PLOModel = require('../models/Chuongtrinh/PLO.model');
const POModel = require('../models/Chuongtrinh/PO.model');
const dapUng_CTModel = require('../models/Chuongtrinh/dapUng_CT.model');
const TempLate = require('../models/Template/Template');
const DapUngCDR = require('../models/HocPhan/DapUngCDR.model');
const Handlebars = require('handlebars');
const { mongooseToObject, MutipleMongooseToObject } = require('../util/mongoose');
const User = require('../models/NguoiDung/NguoiDung.model');
const Create = require('../models/NguoiDung/Create.model');
const Auto = require('../models/AautoText/Auto.model');
const fs = require('fs');

exports.Admin_index = (req, res) => {
  const token = req.cookies.token;
  const Program = 1;
  res.render('admin/HomePageAdmin', { token, Program })
}

exports.Admin_GET_Program = async (req, res) => {
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
      chuongTrinh: chuongTrinhAsObject,
      PO: posObjects, PLO: ploObjects,
      DapungCT: mappingObjects,
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
    const token = req.cookies.token;
    const Program = 1;
    let compiledString = compiledTemplates.join('');
    res.render('admin/ProgramGet', {
      chuongTrinh: chuongTrinhAsObject,
      PO: posObjects, PLO: ploObjects,
      DapungCT: mappingObjects,
      GroupLoai: groupedPLO,
      token,
      Program
    })
  } catch (error) {
    console.error('Error fetching ChuongTrinh:', error.message);
    res.status(500).send('Internal Server Error');
  }
}
exports.Admin_Edit_GET_Program = async (req, res) => {
  const chuongTrinh = await ChuongTrinh.find();
  const chuongTrinhAsObject = chuongTrinh.map(mongooseToObject);
  const token = req.cookies.token;
  const Program = 1;
  res.render('admin/editProgram', { chuongTrinh: chuongTrinhAsObject, token, Program });
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
  const token = req.cookies.token;
  const Program = 1;
  res.render('admin/PO', { PO: posObjects, token, Program })
}
exports.Admin_POST_PO = async (req, res) => {
  try {
    const { TenMT_CTDT, NoiDung, id_CT, MaMT_CTDT } = req.body;
    const newItem = new POModel({ TenMT_CTDT, NoiDung, id_CT, MaMT_CTDT });
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
    console.log(itemId);
    const FindOne = await POModel.findById(itemId); // Use findById for correct querying
    if (!FindOne) {
      return res.status(404).json({ message: 'Item not found' });
    }
    var maMT = FindOne.MaMT_CTDT;

   await dapUng_CTModel.deleteOne({ MaMT_CTD: maMT });

   await POModel.findByIdAndDelete(itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).send('Error deleting item');
  }
};

exports.Admin_GET_PLO = async (req, res) => {
  const PLO = await PLOModel.find({});
  const ploObjects = PLO.map(mongooseToObject);
  const token = req.cookies.token;
  const Program = 1;
  res.render('admin/PLO', { PLO: ploObjects, token, Program })
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
    await DapUngCDR.deleteMany({ Ten_CDR: Ten_CDR })

    await PLOModel.findByIdAndDelete(itemId);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).send('Error deleting item');
  }
};

exports.Admin_GET_TEMPLATE = async (req, res) => {
  const template = await TempLate.find().sort({ order: 1 })
  const templates = template.map(mongooseToObject);
  const token = req.cookies.token;
  try {
    res.render('admin/TempateUpdate', {
      templates,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
exports.Admin_GET_TEMPLATE_DEVELOPMENT =async (req, res) => {
  const template = await TempLate.find({ compileMethod: "FormQuyDinh" });
  const templates = template.map(mongooseToObject);
  const token = req.cookies.token;
  try {
    res.render('admin/template-development', {
      templates,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
exports.Admin_PUT_TEMPLATE_DEVELOPMENT = async (req, res) => {
  try {
    const templateId = req.body.templateId;
    const combinedString = req.body.combinedString;


    const updatedTemplate = await TempLate.findByIdAndUpdate(
        templateId,
        { $set: { htmlContent: combinedString } },
        { new: true } 
    );

    if (!updatedTemplate) {
        return res.status(404).json({ error: 'Template not found' });
    }

    res.status(200).json({
        message: 'Template updated successfully',
        updatedTemplate: updatedTemplate
    });
} catch (error) {
    console.error('Error updating template development:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}
exports.Admin_PUT_TEMPLATE = async (req, res) => {
  const templateId = req.params.id;
  const formObject = req.body;
  try {
    // Update the template document in the database
    const updatedTemplate = await TempLate.findByIdAndUpdate(templateId, formObject, { new: true });

    if (!updatedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.json({ message: 'Template updated successfully', template: updatedTemplate });
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.Admin_GET_LIST_USER = async (req, res) => {
  try {
    const users = await User.find({ role: 0 });
    const usersWithCreates = await Promise.all(users.map(async (user) => {
      const creates = await Create.find({ username: user.username });
      return {
        ...user.toObject(),
        creates: creates.map(create => create.toObject())
      };
    }));
    const token = req.cookies.token;

    res.render('admin/ListUser', { users: usersWithCreates, token });
  } catch (error) {
    console.error('Error fetching users and creates:', error);
    res.status(500).send('Internal Server Error');
  }
};
exports.Admin_POST_LIST_USER = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const newPLO = new User({
      username,
      password,
      role
    });

    await newPLO.save();
    res.status(201).json({ message: 'New PLO item added successfully', newPLO });
  } catch (error) {
    console.error('Error adding new PLO item:', error);
    res.status(500).json({ message: 'Error adding new PLO item', error: error.message });
  }
}

exports.Admin_DELETE_LIST_USER = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userToDelete = await User.findById(itemId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Xóa tất cả các "creates" liên quan đến người dùng này
    await Create.deleteMany({ username: userToDelete.username });

    // Xóa người dùng
    await User.findByIdAndDelete(itemId);

    res.json({ message: 'User and related creates deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
exports.Admin_DELETE_CREATE_BY_USER = async (req, res) => {
  try {
    const itemId = req.params.id;
    await Create.findByIdAndDelete(itemId);

    res.json({ message: 'User and related creates deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }

};
exports.Admin_GET_Matrix = async (req, res) => {
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
  const token = req.cookies.token;
  const Program = 1;
  res.render('admin/MatrixPO-PLO', {
    chuongTrinh: chuongTrinhAsObject,
    PO: posObjects, PLO: ploObjects,
    DapungCT: mappingObjects,
    GroupLoai: groupedPLO,
    token,
    Program
  });
};
exports.Admin_POST_UPDATE_Matrix = async (req, res) => {
  try {
    // Xóa dữ liệu hiện tại

    const date = await dapUng_CTModel.find();
    console.log(req.body)
    console.log(date)
    await dapUng_CTModel.deleteMany({});
    await dapUng_CTModel.insertMany(req.body);

    res.json({ success: true, message: "Dữ liệu đã được cập nhật" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Có lỗi xảy ra" });
  }

};

exports.Admin_GET_AUTOCOMPLETE = async (req, res) => {
  const auto = await Auto.find();
  const autoObjects = auto.map(mongooseToObject);
  const token = req.cookies.token;
  res.render('admin/Autocomplete',{token,auto:autoObjects});
}
exports.Admin_PUT_AUTOCOMPLETE = async (req, res) => {
  const templateId = req.params.id;
  const formObject = req.body;
  try {
    const updatedAuto = await Auto.findByIdAndUpdate(templateId, formObject, { new: true });

    if (!updatedAuto) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.json({ message: 'Template updated successfully', Auto: updatedAuto });
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
function compileMethod(templateString, data) {
  const compiledTemplate = Handlebars.compile(templateString);
  return compiledTemplate(data);
}

Handlebars.registerHelper('ifMatch', function (idCDR, maMT_CTDT, dapungCT) {
  if (!Array.isArray(dapungCT)) {
    console.error("dapungCT must be an array");
    return '';
  }
  const mapping = dapungCT.find(item => {
    if (!item || !item.id_CDR || !item.MaMT_CTDT) {
      console.error("Invalid item:", item);
      return false;
    }

    return item.id_CDR.trim() === idCDR.trim() &&
      item.MaMT_CTDT.trim() === maMT_CTDT.trim();
  });

  if (mapping) {
    return 'X';
  } else {
    return '';
  }
});








