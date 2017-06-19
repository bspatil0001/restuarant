var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res._response('index');
});

router.use('/restuarant', require('./restuarant'));
router.use('/table', require('./table'));
router.use('/user',  require('./user'));
router.use('/review',  require('./review'));

module.exports = router;
