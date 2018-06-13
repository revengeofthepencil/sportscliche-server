const mongoose = require('mongoose');

const ClicheSchema = mongoose.Schema({
    sport: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Cliche', ClicheSchema);