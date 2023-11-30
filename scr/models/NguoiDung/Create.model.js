const mongoose = require('mongoose');
const CreateSchema = new Schema({
    fileName: { 
        type: String,
        required: true,
        unique: true
      },
    User: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
      }      
  });
const Create = mongoose.model('Create', CreateSchema);
module.exports =Create;