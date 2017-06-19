exports.validateBookingInfo = function(req, res, next) {
    var body = req.body;
    if(body.start_time > body.end_time){
      return next(new Error("Start time should greater than end date."))
    }
    return next();
};
