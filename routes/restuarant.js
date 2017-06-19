var express = require('express');
var router = express.Router();
var restuCtrl = require(RESTUARANT_CONTROLLER);

/* GET home page. */
router.get('/',
  restuCtrl.Query
);

router.post('/',
  restuCtrl.Add
);

router.delete('/:id',
  restuCtrl.Remove
);

module.exports = router;
