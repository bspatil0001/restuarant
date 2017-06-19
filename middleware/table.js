var tableSchema = SCHEMA_TABLE;
var bookingSchema = SCHEMA_BOOKING;



exports.checkTableAvailability = function(req, res, next) {
  var body = req.body;

  tableSchema.findOne({_id: body.table}, function(err, result){
    console.log(result);
    if (err)
      return next(err);
    else if (!result.availability)
      return next(new Error("This is not available for booking."));
    else
      return next();
    }
  )
};

exports.checkAvailability = function(req, res, next) {
  var body = req.body;
  var where = {
    "start_time": {
      "$lte": body.end_time
    },
    "end_time": {
      "$gte": body.start_time
    },
    "table": body.table
  };
  console.log(where);
  bookingSchema.count(where, function(err, count) {
    if (count > 0) {
      return next(new Error("This table not available on selected time"))
    }
    return next();
  });
};
