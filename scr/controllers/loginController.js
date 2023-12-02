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
            return res.json({ 
                message: 'Logged in successfully',
                token: token
            });   
        } else {
            return res.json('that bai')
        }  
    })
    .catch((err) => {
        res.status(500).json('khong tim thay');
    })
    
}

exports.home_get = (req, res) => {
    res.render('home', { user: req.user }); 
};

  
