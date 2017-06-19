var async = require('async');
var reviewSchema = SCHEMA_REVIEW;

exports.Query = function(req, res, next) {

  var query = req.query;
  var sort = {},
    start,
    end;
  if (query.sort) {
    sort[query.sort] = query.sort_type == 'asc'
      ? '1'
      : '-1';
    delete query.sort;
    delete query.sort_type;
  }

  async.parallel({
    review: function(cb) {
      reviewSchema.QueryData(query, sort, cb);
    },
    count: function(cb){
      reviewSchema.count(query, cb);
    }
  }, function(err, result){
    if(err)
      return next(err);
    res._response({data:result}, R_T_SUCCESS, R_S_OK, "Review fetched successfully");
  })
}

exports.Add = function(req, res, next) {
  new reviewSchema(req.body).save(function(err, data) {
    if (err)
      return next(err);
    res._response({
      data: data
    }, R_T_SUCCESS, R_S_OK, "Review added successfully");
  })
}
