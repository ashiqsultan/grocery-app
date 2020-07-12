require('dotenv').config();

const jwt_options = {
	issuer: 'MyExampleCorp', // Issuer
	expiresIn: '12h', // Time the JWT will be valid
	algorithm: 'HS256', // same kwy for both server and client
};

const jwt_secret = process.env.JWT_SECRET;

const db_connection_string = process.env.DB_CONNECT_STRING;

module.exports = {
	jwt_secret,
	db_connection_string,
	jwt_options,
};
