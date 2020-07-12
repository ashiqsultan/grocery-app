const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroceryItemsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	quantity: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

const GroceryItemsModel = mongoose.model('groceryitems', GroceryItemsSchema);
module.exports = GroceryItemsModel;
