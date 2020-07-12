const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../../../Models/UserModel');
const sendJWT = require('../functions/sendJWT');

router.post(
	`/`,
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
	],
	async (req, res, next) => {
		try {
			// Validate the inputs using express-validator middleware
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { email, password } = req.body;

			// Getting User details from the provided email, if no email means no user so send error
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ message: 'Invalid Credentials' }] });
			}

			//If email exists then check password match
			// Comparing password by decrypting the password using bcryptjs
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			} else {
				res.json(await sendJWT(user)); // this will send the token as a json
			}
		} catch (error) {}
	}
);

module.exports = router;
