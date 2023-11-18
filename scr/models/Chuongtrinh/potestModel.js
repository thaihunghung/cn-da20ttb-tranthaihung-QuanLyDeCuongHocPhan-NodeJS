const poData = require('../../datatest/ChuongTrinh/PO.json');
const ploData = require('../../datatest/ChuongTrinh/PLO.json');
const dapungData = require('../../datatest/ChuongTrinh/dapung_ct.json');

module.exports = {
  getPOData: () => poData,
  getPLOData: () => ploData,
  getDapungData: () => dapungData,
};