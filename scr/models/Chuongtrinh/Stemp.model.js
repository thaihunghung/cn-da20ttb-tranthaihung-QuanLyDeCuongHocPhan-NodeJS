const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    _id: String,
    seq: Number
  });
const Counter = mongoose.model('Counter', CounterSchema);