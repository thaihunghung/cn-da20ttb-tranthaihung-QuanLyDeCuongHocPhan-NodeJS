const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
router.get('/',UserController.index);
router.get('/listProject',UserController.listProject);

module.exports = router;