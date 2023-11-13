const express = require('express');
const router = express.Router();
const chuongcontroller = require('../controllers/chuongController');

router.get('/',chuongcontroller.ChuongVaTatCaNoiDung)

module.exports = router;
