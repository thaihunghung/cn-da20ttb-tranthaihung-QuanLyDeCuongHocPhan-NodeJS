const MonHoc = require('../models/monHoc'); // Adjust the path as needed
const {mongooseToObject}= require('../util/mongoose');
exports.monHoc_create_get = (req, res) => {
  res.render('monHocForm', { title: 'Create MonHoc' });
};

exports.monHoc_create_post = async (req, res) => {
    let monHoc = new MonHoc({
      tenMonHoc: req.body.tenMonHoc,
      TLTK: req.body.TLTK
      // Include additional fields as necessary
    });
  
    try {
      await monHoc.save();
      res.redirect('/monhoc/list');
    } catch (err) {
      res.render('monHocForm', { title: 'Create MonHoc', errorMessage: 'Error creating MonHoc' });
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