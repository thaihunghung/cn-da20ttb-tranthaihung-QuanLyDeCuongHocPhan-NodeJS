const express = require('express');
const HocPhanController = require('../controllers/HocPhanController');
const router = express.Router();

router.post('/',HocPhanController.HocPhanPostSave);
router.put('/:maMon',HocPhanController.HocPhanPut);
router.delete('/:maMon',HocPhanController.HocPhanDelete);
module.exports = router;