const mongoose = require("mongoose");

const streetSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	block_searched: { type: String, required: true }
});

module.exports = mongoose.model("Street", streetSchema);
