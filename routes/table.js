var express = require('express');
var router = express.Router();
var tableCtrl = require(TABLE_CONTROLLER);
var tableMdlr = require(TABLE_MIDDLEWARE);

router.get("/",
  tableCtrl.QueryTable
)

router.get("/restuarant/:id",
  tableCtrl.QueryData
)

router.post("/", tableCtrl.Add)

router.put("/:id", tableCtrl.Update)

router.delete('/:id',
  tableCtrl.Remove
)

module.exports = router;
