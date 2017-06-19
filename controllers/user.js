var bookingSchema = SCHEMA_BOOKING;
var async = require('async');

exports.Query = function(req, res, next){
  var query = req.query;
  var where;
  var sort = {};
  if(query.sort){
    sort[query.sort] = query.sort_type == '1' ? '1' : '-1';
    delete query.sort;
    delete query.sort_type;
  }
  var where = {}
  if(query.start_time && query.end_time){

    where = {
      "start_time": {
        "$lte": query.end_time
      },
      "end_time": {
        "$gte": query.start_time
      },
      "table": query.table
    };
    delete query.end_time;
    delete query.start_time;
  };

  Object.assign(where, query);

  // if(x){
  //   where
  // }

  console.log("Query:", query);
  console.log("where:", where);
  async.parallel({
    booking: function(cb){
      bookingSchema.QueryData(query, where, sort, cb);
    },
    count: function(cb){
      bookingSchema.count(query, cb);
    }
  }, function(err, result){
    console.log("result", result);
    if(err)
      return next(err);
    res._response({booking: result}, R_T_SUCCESS, R_S_OK, "All bookings fetched");
  })

  bookingSchema.QueryData()
}

exports.Book = function(req, res, next){
  var body = req.body;
  body.availability = false;
  var id = req.params.id;
  new bookingSchema(req.body).save(function(err, result){
    if(err)
      return next(err);
    res._response({data:result}, R_T_SUCCESS, R_S_OK, "Table booked successfully");
  })
}

exports.Remove = function(req, res, next){
  var id = req.params.id;
  bookingSchema.remove({_id: id}, function(err, result){
    if(err)
      return next(err);
    res._response({data:result}, R_T_SUCCESS, R_S_OK, "Table booking canceled");
  })
}
