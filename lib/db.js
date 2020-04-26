/** Crime type data module
* @module lib/db
*/

/** Requires the mongoose module of the `mongoose` library.
* @requires mongoose
*/
const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB_CONNECTION, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;
