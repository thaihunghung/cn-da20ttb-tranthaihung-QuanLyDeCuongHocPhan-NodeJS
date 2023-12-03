const express = require('express');
const HocPhanController = require('../controllers/HocPhanController');
const {verifyToken} = require('../middleware/auth.middleware');
const router = express.Router();
router.get('/', HocPhanController.HocPhanGet);
router.post('/',HocPhanController.HocPhanPostSave);
router.delete('/:MaHP',HocPhanController.HocPhanDelete);
module.exports = router;