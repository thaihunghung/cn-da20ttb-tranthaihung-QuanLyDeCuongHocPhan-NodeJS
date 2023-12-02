const jwt = require('jsonwebtoken');
const create = require('../models/NguoiDung/Create.model');

exports.index = (req, res) =>{
    res.render('home');
}
exports.User_Create_fileName = (req, res) =>{
    res.render('user/create_fileName')
}

exports.Check_File_Name = async (req, res) =>{
    const { filename } = req.body;
    const token = req.cookies.token;
    const {username, role}= jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (username){
      console.log('thanh cong '+username);
      var fileNameInCreate = username + ":"+ filename;
    }
    else{
      console.log('loi');
    }
    try {
        // Kiểm tra xem tên dự án đã tồn tại trong database chưa
        const project = await create.findOne({ fileName: fileNameInCreate });
        if (project) {
            // Tên dự án đã tồn tại
            res.json({ exists: true });
            return;
        } else {
            const data = {
                "fileName": username+":"+filename,
                "username": username
            }
            const Duan = new create(data);
            const saverDuan = await Duan.save();
            //gửi tính hiệu về font end 
            res.json({ exists: false });
            return;
        }
    } catch (error) {
        console.error('Lỗi :', error);
        res.status(500).json({ error: error.message })
    }
};