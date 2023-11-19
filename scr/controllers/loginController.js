const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
app.use(cookieParser());
dotenv.config();
const NguoiDung = require('../models/NguoiDung/NguoiDung.model');
exports.login_get = (req, res, next) => {
    res.render('login/login');
}
exports.login_post = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    NguoiDung.findOne({ 
        username: username,
        password: password
    })
    .then((data) => {
        if(data) {
           var token = jwt.sign({
            username: data.username,
            role: data.role
           }, process.env.TOKEN_SECRET_KEY)
            res.cookie('token', token, { httpOnly: true }); 
            res.json({ message: 'Logged in successfully' });
        } else {
            res.json('that bai')
        }  
    })
    .catch((err) => {
        res.status(500).json('khong tim thay');
    })
    
}

exports.home_get = (req, res) => {
    res.render('home', { user: req.user }); // Pass user information to the view
};

// exports.verifyToken =async (req, res, next) => {
//     const token = localStorage.getItem('token');
//    await console.log(`Verifying ${token}`);
//     if(!token) {
//       return res.status(401).send('Access denied');
//     }
  
//     try {
//       const verified = jwt.verify(token, 'secretkey');
//       req.user = verified; 
//       next();
//     } catch(err) {
//       res.status(400).send('Invalid token');
//     }
//   }
  
