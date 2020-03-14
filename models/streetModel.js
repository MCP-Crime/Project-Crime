const mongoose = require("mongoose");

const streetSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: { type: Date, required: true },
	block_name_searched: { type: String, required: true },
	block_name: { type: String, required: true },
	location_description: { type: String, required: true },
	timestamps: { type: Date, required: true }
});

module.exports = mongoose.model("Street", streetSchema);
