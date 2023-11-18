
const Handlebars = require('handlebars');

module.exports = {
    ifMatch: function(idCDR, maMT_CTDT, dapungCT) {
        console.log("plo",idCDR);
        console.log("po",maMT_CTDT);

        console.log('dap ung',dapungCT);
        if (!Array.isArray(dapungCT)) {
          console.error("dapungCT must be an array");
          return '';
        }
        const mapping = dapungCT.find(item => {
          if (!item || !item.id_CDR || !item.MaMT_CTD) {
            console.error("Invalid item:", item);
            return false;
          }
          
          return item.id_CDR.trim() === idCDR.trim() && 
                item.MaMT_CTD.trim() === maMT_CTDT.trim();
        });
      
        if (mapping) {
          return 'X';
        } else {
          return '';
        }
    },
    ifDifferent: function(value1, value2, options) {
      if (value1 !== value2) {
          return options.fn(this);
      } else {
          return options.inverse(this);
      }
    },
    getKey: Handlebars.helpers.getKey
}