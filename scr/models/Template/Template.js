const mongoose = require('mongoose');

// Định nghĩa schema
const template = new mongoose.Schema({
  order: {
    type: Number,
    required: true
  },
  compileMethod: {
    type: String
  },
  htmlContent: {
    type: String
  },
});

const Template = mongoose.model('template', template);
module.exports =Template;