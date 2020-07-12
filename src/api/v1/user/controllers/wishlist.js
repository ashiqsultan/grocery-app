const router = require('express').Router();
const checkJWT = require('../functions/checkJWT');
const UserModel = require('../../../../Models/UserModel');

router.get(`/`, checkJWT, async (req, res, next) => {
	const userId = req.userid;
	const query = UserModel.findById(userId).select('wishlist');
	query.exec((err, result) => {
		if (err) {
			next(err);
		} else {
			res.send(result);
		}
	});
	// res.json({ response: req.userid });
});

router.post(`/`, checkJWT, async (req, res, next) => {
	try {
		const userId = req.userid;
		const groceryItemId = req.body.groceryItemId;
		const query = UserModel.findByIdAndUpdate(
			userId,
			{
				$push: { wishlist: groceryItemId },
			},
			{ new: true }
		);
		const queryToExecute = await query.exec();
		res.json({ wishlist: queryToExecute.wishlist });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
