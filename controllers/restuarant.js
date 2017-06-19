var restuSchema = SCHEMA_RESTUARANT;
var async = require("async");

exports.Test = function(req, res, next) {
  console.log("controller");
  res._response({
    request: "hi"
  }, R_T_SUCCESS, R_S_OK, "Request created successfully.");
};

exports.Add = function(req, res, next) {
  new restuSchema(req.body).save(function(err, data) {
    if (err)
      return next(err);
    res._response(data, R_T_SUCCESS, R_S_OK, "Restuarant added successfully.")
  });
}

exports.Query = function(req, res, next){
  var query = req.query;
  var sort = {};
  if(query.sort){
    sort[query.sort] = query.sort_type == 'asc' ? '1' : '-1';
    delete query.sort;
    delete query.sort_type;
  }

  if (query.name)
      query["name"] = { $regex: req.query.name, $options: 'i' };
  if (query.location)
      query["location"] = { $regex: req.query.location, $options: 'i' };
  if (query.cuisines)
      query["cuisines"] = { $regex: req.query.cuisines, $options: 'i' };
  async.parallel({
    restuarant: function(cb){
      restuSchema.QueryData(query, sort, cb)
    },
    count: function(cb){
      restuSchema.count(query, cb)
    }
  }, function(err, result){
    if(err)
      return next(err);
    res._response(result, R_T_SUCCESS, R_S_OK, "Resuarants fetched successfully");
  })
}

exports.Remove = function(req, res, next){
  var id = req.params.id;
  restuSchema.remove({_id: id}, function(err, data){
    if(err)
      return next(err);
    res._response(data, R_T_SUCCESS, R_S_OK, "Restuarant deleted successfully");
  })
}
