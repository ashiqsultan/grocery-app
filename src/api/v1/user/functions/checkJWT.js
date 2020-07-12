const jwt = require('jsonwebtoken');
const jwt_options = require('../../../../config').jwt_options;
const jwt_secret = require('../../../../config').jwt_secret;

/* 
The functionality of this middleware is to get the token from the header and check whether is it a valid token.
If the token is valid the next middleware in the stack is called else Status 401 is sent
*/

module.exports = async function (req, res, next) {
	//Get token from header
	const authorizationHeader = req.header('Authorization');
	try {
		let token;
		if (authorizationHeader.startsWith('Bearer ')) {
			token = authorizationHeader.substring(7, authorizationHeader.length);
		} else {
			res.status(401).json({ message: 'Invalid Token, Authorization denied' });
		}

		jwt.verify(token, jwt_secret, jwt_options, (error, decoded) => {
			if (error) {
				const message = 'Token is not valid';
				res.status(401).json({ message });
			} else {
				req.userid = decoded.user.id;
				next();
			}
		});
	} catch (error) {
		console.error('Something wrong with the auth middleware');
		res.status(500).json({ message: 'Server Error' });
	}
};
