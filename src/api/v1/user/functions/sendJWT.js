const jwt = require('jsonwebtoken');
const jwt_options = require('../../../../config').jwt_options;
const jwt_secret = require('../../../../config').jwt_secret;

const sendJWT = (userdata) => {
	try {
		const payload = {
			user: {
				id: userdata.id,
				email: userdata.email,
			},
		};
		return new Promise(async (resolve, reject) => {
			jwt.sign(payload, jwt_secret, jwt_options, (error, token) => {
				if (error) reject(new Error(`JWT promise rejected \n ${error}`));
				else resolve({ token });
			});
		});
	} catch (error) {
        console.error(error)
    }
};

module.exports = sendJWT;
