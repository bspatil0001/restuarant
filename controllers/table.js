var tableSchema = SCHEMA_TABLE;
var async = require('async');

exports.QueryData = function(req, res, next){
  var id = req.params.id;
  var where;
  var query, sort;

  var query = req.query;

  var sort = {},
            start,
            end;
  if(query.sort){
    sort[query.sort] = query.sort_type == 'asc' ? '1' : '-1';
    delete query.sort;
    delete query.sort_type;
  }

  query["restuarant"] = id;

  if (query.name)
      query["name"] = { $regex: req.query.name, $options: 'i' };
  async.parallel({
    table: function(cb){
      tableSchema.QueryData(query, sort, cb)
    },
    count: function(cb){
      tableSchema.count(query, cb)
    }
  }, function(err, result){
    if(err)
      return next(err);
    res._response(result, R_T_SUCCESS, R_S_OK, "Resuarants fetched successfully");
  })

}

exports.QueryTable = function(req, res, next){
  var id = req.params.id;
  var query, sort, start, limit;

  var query = req.query;

  var sort = {},
            start,
            end;
  if(query.sort){
    sort[query.sort] = query.sort_type == 'asc' ? '1' : '-1';
    delete query.sort;
    delete query.sort_type;
  }

  if (query.name)
      query["name"] = { $regex: req.query.name, $options: 'i' };

  async.parallel({
    table: function(cb){
      tableSchema.QueryData(query, sort, cb)
    },
    count: function(cb){
      tableSchema.count(cb)
    }
  }, function(err, result){
    if(err)
      return next(err);
    res._response(result, R_T_SUCCESS, R_S_OK, "Resuarants fetched successfully");
  })

}

exports.Add = function(req, res, next){
  new tableSchema(req.body).save(function(err, data){
    if(err)
      return next(err);
    res._response(data, R_T_SUCCESS, R_S_OK, "Table added successfully");
  })
}

exports.Update = function(req, res, next){
  var id = req.params.id;
  console.log(req.body, id);
  tableSchema.findOneAndUpdate({_id:id}, req.body,{
    new: true
  }, function(err, result){
    console.log(result);
    if(err)
      return next(err);
    res._response({table: result}, R_T_SUCCESS, R_S_OK, "Table updated successfully");
  })
}

exports.Remove = function(req, res, next){
  var id = req.params.id;
  tableSchema.remove({_id:id}, function(err, result){
    console.log(err, result);
    if(err)
      return next(err);
    res._response(result, R_T_SUCCESS, R_S_OK, "Table removed successfully");
  })
}
