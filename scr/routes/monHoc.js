const express = require('express');
const router = express.Router();
const monHoc_controller = require('../controllers/monHocController');

// GET request to show the form
router.get('/create', monHoc_controller.monHoc_create_get);

// POST request to submit the form
router.post('/create', monHoc_controller.monHoc_create_post);

module.exports = router;
