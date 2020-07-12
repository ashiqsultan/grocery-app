const router = require('express').Router();
const grocery = require('./grocery/main');
const user = require('./user/main');

router.use('/grocery', grocery);
router.use('/user', user);

module.exports = router;
