const mongoose = require('mongoose');
const dataBaseConnectionString = require('../config').db_connection_string;

const dbConnect = async () => {
	try {
		await mongoose.connect(dataBaseConnectionString, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected Successfully');
	} catch (err) {
		console.error(err.message);
		console.error('Error: Cannot connect to MongoDB');
	}
};
module.exports = dbConnect;
