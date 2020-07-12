const router = require('express').Router();
const GroceryItemsModel = require('../../../../Models/GroceryItemsModel');

router.get(`/`, async (req, res, next) => {
	try {
		GroceryItemsModel.find((err, value) => {
			if (err) {
				next(err);
			} else {
				res.json(value);
			}
		});
	} catch (error) {
		next(error);
	}
});
module.exports = router;
