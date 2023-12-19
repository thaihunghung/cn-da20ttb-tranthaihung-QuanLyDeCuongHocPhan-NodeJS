const Create = require('../models/NguoiDung/Create.model');
const {mongooseToObject,MutipleMongooseToObject} = require('../util/mongoose');
const jwt = require('jsonwebtoken');
exports.index = (req, res) =>{

}
exports.listProject = async (req, res) => {
    const token = req.cookies.token; 
    if (token) {
        try {
            var decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            const { username, role } = decoded;

            const ListCreate = await Create.find({ username: username });

            const ListCreateObject = ListCreate.map(item => {
                const fileNameParts = item.fileName.split(':');
                const actualFileName = fileNameParts.length > 1 ? fileNameParts[1] : item.fileName;
                return {
                    username: item.username,
                    nameProject: actualFileName
                };
            });
            res.render('project/listProject', { ListCreate: ListCreateObject});
        } catch (err) {
            console.error('Lỗi khi giải mã token:', err.message);
            res.status(401).json({ message: 'Token không hợp lệ' });
        }
    } else {
        console.log('Không có token');
        res.status(401).json({ message: 'Token không tồn tại' });
    }
};
