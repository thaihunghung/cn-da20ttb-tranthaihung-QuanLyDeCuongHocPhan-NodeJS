const HocPhan = require('./hocPhan.model');

class HocPhanModel {
    getLoaiHocPhanByMaMon(maMon) {
        try {
            const hocPhan =  HocPhan.findOne({ MaMon: maMon }, 'LoaiHocPhan').lean();
            return hocPhan ? hocPhan.LoaiHocPhan : null;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
      }
}

module.exports = HocPhanModel;