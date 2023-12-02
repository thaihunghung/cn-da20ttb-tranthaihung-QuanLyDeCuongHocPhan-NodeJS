
const mongoose = require('mongoose');
const uuid = require('uuid');

const DieuKienThamGiaSchema = new mongoose.Schema({
    MaDK_TG: { type: String, default: uuid.v4, required: true, unique: true },
    MaHP: { type: mongoose.Schema.Types.ObjectId, ref: 'HocPhan._id', required: true },
    HocPhan_TQ: [
        {
            Ten_HocPhan_TQ: String,
            MSHP_TQ: Number
        }
    ],
    HocPhan_SH: [String],
    YC_khac: [
        {
            KienThuc: [String],
            KyNang: [String],
            ThaiDo: [String]
        }
    ],
  });

module.exports = mongoose.model('DieuKienThamGia', DieuKienThamGiaSchema);