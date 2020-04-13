const mongoose = require('mongoose');

const crimeSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {type : String}
});

module.exports = mongoose.model('crimes', crimeSchema);