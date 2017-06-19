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
  console.log("body", body);
  bookingSchema.count(where, function(err, count) {
    console.log(count);
    if (count > 0) {
      return next(new Error("This table not available on selected time"))
    }
    return next();
  });
};


exports.canDeleteBooking = function(req, res, next){
  var id = req.params.id;
  bookingSchema.find({_id:id}, function(err, data) {
    if(data.start_time > new Date()){
      return next();
    }
    else{
      return next(new Error("You cant served bookings."))
    }
  });
}
