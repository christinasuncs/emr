const mongoose = require('mongoose');

const immunizationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    next: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('Immunization', immunizationSchema);