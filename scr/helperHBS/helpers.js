const Handlebars = require("handlebars");

module.exports = {
  joinArray: function (array) {
    return array.join(", ");
  },
  ifCond: function (v1, operator, v2, options) {
    switch (operator) {
      case "===":
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case "!==":
        return v1 !== v2 ? options.fn(this) : options.inverse(this);
      // You can add more cases here for different operators if needed
      default:
        return options.inverse(this);
    }
  },
  calculateColspan: function (array, addValue) {
    if (!array || !Array.isArray(array)) {
      return addValue; // Trả về addValue nếu array không hợp lệ
    }
    return array.length + addValue;
  },
  inc: function (value) {
    return parseInt(value) + 1;
  },
  nestedIndex: function (outerIndex, innerIndex, options) {
    return outerIndex + "." + innerIndex;
  },
  ifMatch: function (idCDR, maMT_CTDT, dapungCT) {
    if (!Array.isArray(dapungCT)) {
      console.error("dapungCT must be an array");
      return "";
    }
    const mapping = dapungCT.find((item) => {
      if (!item || !item.id_CDR || !item.MaMT_CTDT) {
        console.error("Invalid item:", item);
        return false;
      }

      return (
        item.id_CDR.trim() === idCDR.trim() &&
        item.MaMT_CTDT.trim() === maMT_CTDT.trim()
      );
    });

    if (mapping) {
      return "X";
    } else {
      return "";
    }
  },
  ifMatchHP: function (idCDR, tenCDR, dapungCT) {
    if (!Array.isArray(dapungCT)) {
      console.error("dapungCT must be an array");
      return "";
    }
    const mapping = dapungCT.find((item) => {
      return (
        item.Ten_CDR.trim() === tenCDR.trim() &&
        item.MaCDR_MH.toString() === idCDR.toString()
      );
    });

    return mapping ? "X" : "";
  },
  Matrix: function (idCDR, maMT_CTDT, dapungCT) {

    if (!Array.isArray(dapungCT)) {
      return "";
    }
    const mapping = dapungCT.find((item) => {
      // Đảm bảo rằng item là hợp lệ và có các thuộc tính cần thiết
      if (!item || !item.id_CDR || !item.MaMT_CTDT) {
        //console.error("Invalid item:", item);
        return false;
      }
      // So sánh các thuộc tính để xác định trạng thái "checked"
      return (
        item.id_CDR.toString().trim() === idCDR.toString().trim() &&
        item.MaMT_CTDT.toString().trim() === maMT_CTDT.toString().trim()
      );
    });

    return mapping ? "checked" : "";
  },
  getKey: Handlebars.helpers.getKey,
  dynamicPartial: function (partialName) {
    return partialName;
  },
  eq: function (arg1, arg2) {
    return arg1.trim() === arg2.trim();
  },
  and: function (a, b) {
    a && b;
  },

  isChecked: function (arg1, arg2) {
    return arg1.trim() === arg2.trim();
  },
  getIdFromDapungCT: function (idCDR, maMT_CTDT, dapungCT) {
    if (!Array.isArray(dapungCT)) {
      
      return "";
    }
    const mapping = dapungCT.find((item) => {
      // Đảm bảo rằng item là hợp lệ và có các thuộc tính cần thiết
      if (!item || !item.id_CDR || !item.MaMT_CTD) {
       
        return false;
      }
      // So sánh các thuộc tính để xác định trạng thái "checked"
      return (
        item.id_CDR.toString().trim() === idCDR.toString().trim() &&
        item.MaMT_CTD.toString().trim() === maMT_CTDT.toString().trim()
      );
    });

    return mapping ? mapping._id : "";
  },
};
