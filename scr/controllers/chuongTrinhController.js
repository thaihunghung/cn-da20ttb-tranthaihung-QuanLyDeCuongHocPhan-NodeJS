const ChuongTrinh = require('../models/Chuongtrinh/chuongTrinh.model');
const PLOModel = require('../models/Chuongtrinh/PLO.model');
const POModel = require('../models/Chuongtrinh/PO.model');
const dapUng_CTModel = require('../models/Chuongtrinh/dapUng_CT.model');

const {mongooseToObject,MutipleMongooseToObject} = require('../util/mongoose');

exports.ChuongTrinh_GET = async (req, res) => {
    try {
        const groupedplo  = {};
        const PO = await POModel.find({});
        const PLO = await PLOModel.find({});
        const DapungCT = await dapUng_CTModel.find({});
        const chuongTrinh = await ChuongTrinh.find();
        // Chuyển đổi sang object
        const posObjects = PO.map(mongooseToObject);
        const ploObjects = PLO.map(mongooseToObject);
        const mappingObjects = DapungCT.map(mongooseToObject);
        
        const chuongTrinhAsObject = chuongTrinh.map(mongooseToObject);

        ploObjects.forEach(item => {
            const key = item.LoaiCDR_CT;
          
            if (!groupedplo[key]) {
                groupedplo[key] = [];
            }
            groupedplo[key].push(item);
        });
        res.render('chuongTrinh/chuongTrinh',{chuongTrinh:chuongTrinhAsObject, PO: posObjects,PLO:ploObjects, DapungCT:mappingObjects, groupedplo})
    } catch (error) {
        console.error('Error fetching ChuongTrinh:', error.message);
        res.status(500).send('Internal Server Error');
    }
}
exports.ChuongTrinh_TEST = (req, res) => {
}