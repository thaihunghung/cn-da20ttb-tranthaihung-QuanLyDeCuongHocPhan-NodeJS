const mongoose = require('mongoose');

const AutocompleteSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    items: [String], 
});

module.exports = mongoose.model('Autocomplete', AutocompleteSchema);