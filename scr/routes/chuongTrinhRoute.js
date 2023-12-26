const express = require('express');
const router = express.Router();
const {verifyToken, hasRole} = require('../middleware/auth.middleware');
const chuongtrinh = require('../controllers/chuongTrinhController');

router.get('/',verifyToken,chuongtrinh.ChuongTrinh_GET);

module.exports = router;