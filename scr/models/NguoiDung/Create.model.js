const mongoose = require('mongoose');
const CreateSchema = new mongoose.Schema({
    fileName: { 
        type: String,
        required: true,
        unique: true
      },
    username: {
        type: String, 
        ref: 'User'
      }      
  });
const Create = mongoose.model('Create', CreateSchema);
module.exports =Create;