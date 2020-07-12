const router = require('express').Router();

router.use('/', require('./controllers/list'));

module.exports = router;
