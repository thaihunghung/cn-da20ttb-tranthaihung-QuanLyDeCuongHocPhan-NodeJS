const MonHoc = require('../models/monHoc'); 
const MonHocTest = require('../models/Monhocdemo');
const {mongooseToObject}= require('../util/mongoose');

exports.monHoc_create_get = async (req, res) => {
  let monHoc = new MonHoc({
    tenMonHoc: req.body.tenMonHoc,
    TLTK: req.body.TLTK
    // Include additional fields as necessary
  });
  try {
    await User.save();
  } catch (err) {
    res.render('monHocForm', { title: 'Create MonHoc', errorMessage: 'Error creating MonHoc' });
  }
  res.render('monHocForm', { title: 'Create MonHoc' });
};

exports.monHoc_create_post = async (req, res) => {
    let monHoc = new MonHocTest({
      MaMon: req.body.tenMonHoc,
      TenMon: req.body.TLTK
      // Include additional fields as necessary
    });
  
    try {
      await monHoc.save();
      res.redirect('/monhoc/list');
    } catch (err) {
      res.render(__dirname,'monHocForm', { title: 'Create MonHoc', errorMessage: 'Error creating MonHoc' });
    }
  };
  
exports.monHoc_list = async (req, res) => {
    try {
      const monHocs = await MonHoc.find();
      res.render('list', { title: 'MonHoc List', monHocList: monHocs.map(mongooseToObject) });
    } catch (err) {
      res.status(500).send('Error retrieving MonHocs');
    }
};