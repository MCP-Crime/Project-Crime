const mongoose = require('mongoose');

const crimeSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    crime_type_searched : {type : String, required : true}
});

module.exports = mongoose.model('crime', crimeSchema);