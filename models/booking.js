var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var tableSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  table:{
    type: Schema.Types.ObjectId,
    ref: "Table",
    required: true
  },
  start_time:{
    type: Date,
    required: true,
  },
  end_time:{
    type: Date,
    required: true,
  }
});

tableSchema.statics.QueryData = function(query,where, sort, cb){
  var qry = this.find(where);
  if(where){
    console.log(where);

  if(sort){
    qry.sort(sort);
  }

    // qry = qry.find(where);
    // console.log("qry", qry);
  }

  qry.exec(cb || console.log)

}

module.exports = DB_CONNECTION.model("Booking", tableSchema);
