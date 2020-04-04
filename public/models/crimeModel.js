const mongoose = require('mongoose');

const crimeSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    date : {type : Date, required : true},
    crime_name_searched : {type : String, required : true},
    crime_type : {type : String, required : true},
    crime_description : {type : String, required : true},
    timestamps : {type : Date, required : true}
}
);

module.exports = mongoose.model('Crime', crimeSchema);