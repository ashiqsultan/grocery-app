const router = require('express').Router();

router.use('/signup', require('./controllers/signup'));
router.use('/signin', require('./controllers/signin'));
router.use('/wishlist', require('./controllers/wishlist'));

module.exports = router;
