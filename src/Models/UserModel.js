const mongoose = require('mongoose');
const GroceryItemsModel = require('./GroceryItemsModel');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	wishlist: [
		{
			type: Schema.Types.ObjectId,
			ref: 'groceryitems',
		},
	],
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
