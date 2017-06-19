var express = require('express');
var router = express.Router();
var reviewCtrl = require(REVIEW_CONTROLLER);

router.get('/', reviewCtrl.Query);

router.post('/', reviewCtrl.Add);

module.exports = router;
