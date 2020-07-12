// This file starts the server
const app = require('./src/app');
const port = process.env.PORT || 8000;

// Server
app.listen(port, () => {
	console.log(`Listening on: http://localhost:${port}`);
	console.log(`Running on Environment : ${app.get('env')}`);
});
