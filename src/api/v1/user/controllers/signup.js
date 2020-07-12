const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../../../../Models/UserModel');
const sendJWT = require('../functions/sendJWT');

const SALT_VALUE = 10; // Salt value to encrypt password on signup

const encryptPassword = async (password, SALT_VALUE) => {
	try {
		console.log('encrypting Pwd');
		const salt = await bcrypt.genSalt(SALT_VALUE);
		const encryptedpassword = await bcrypt.hash(password, salt);
		return encryptedpassword;
	} catch (error) {
		console.error(error)
	}
};

router.post(
	`/`,
	[
		check('name', 'Name must be more than 3 letters').isLength({ min: 3 }),
		check('email', 'Please include a valid email').isEmail(),
	], // express-validator middleware
	async (req, res, next) => {
		try {
			// Validate the inputs using express-validator middleware
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			const { name, email, password } = req.body;

			//See if user exists
			let user = await User.findOne({ email });
			//If user already exists send error
			if (user) {
				return res.status(400).json({ errors: { msg: 'User already exists' } });
			}

			//Save the user to Database and Encrypt Password
			user = new User({
				name,
				email,
				password,
			});
			//Encrypt Password
			user.password = await encryptPassword(password, SALT_VALUE);
			//Save User to DB
			await user.save();
			//Return JSON Web Token if everything went well
			res.json(await sendJWT(user));
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
