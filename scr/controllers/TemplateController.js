const templates = require('../models/Template/Template');
const {mongooseToObject} = require('../util/mongoose');

exports.Template_Editing = async (req, res) => {
    try {
        const tieuDe = await templates.find({tieuDe: "thongTinChung"});
        const TemplateOB = tieuDe.map(mongooseToObject);
        //Template: TemplateOB

        res.render('admin/TempateUpdate', {
            tieuDe: TemplateOB, 
             });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};