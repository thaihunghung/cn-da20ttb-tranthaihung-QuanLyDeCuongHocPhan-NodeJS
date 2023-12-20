
const Handlebars = require('handlebars');

module.exports = {
    joinArray: function(array) {
    return array.join(', ');
    },
    calculateColspan: function(array, addValue) {
      
      if (!array || !Array.isArray(array)) {
        return addValue; // Trả về addValue nếu array không hợp lệ
    }
    return array.length + addValue;
    },
    inc: function(value) {
      return parseInt(value) + 1;
    },
    nestedIndex: function(outerIndex, innerIndex, options) {
      return outerIndex + '.' + innerIndex;
    },
    ifMatch: function(idCDR, maMT_CTDT, dapungCT) {
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
    getKey: Handlebars.helpers.getKey,
    dynamicPartial: function (partialName) {
      return partialName;
    },
    eq: function (v1, v2) {
      return v1 === v2;
    },
    isChecked: function (value, target) {
      return value === target;
    }
}