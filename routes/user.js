var express = require('express');
var router = express.Router();
var userCtrl = require(USER_CONTROLLER);
var tableMdlr = require(TABLE_MIDDLEWARE);
var validator = require(VALIDATOR);

router.get('/',
  userCtrl.Query
)

router.post('/booktable',
  validator.validateBookingInfo,
  tableMdlr.checkTableAvailability,
  tableMdlr.checkAvailability,
  userCtrl.Book
);

router.delete('/:id',
  // tableMdlr.checkAvailability,
  userCtrl.Remove
)

module.exports = router;
