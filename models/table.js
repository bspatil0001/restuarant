var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tableSchema = new Schema({
  restuarant: {
      type: Schema.Types.ObjectId,
      ref: "Restuarant"
  },
  capacity: {
    type: Number,
    required: true
  },
  availability:{
    type: Boolean,
    default: true
  },
  start_time:{
    type: Date
  },
  end_time:{
    type: Date
  }
});

tableSchema.statics.QueryTable = function(query, where, sort, start, limit, cb){
  var qry = this.find(query);
  // if (sort)
  //     qry.sort(sort);
  qry.exec(cb || console.log);
}

tableSchema.statics.QueryData = function(query, sort, cb){
  var qry = this.find(query);
  if (sort)
      qry.sort(sort);
  qry.exec(cb || console.log);
}


module.exports = DB_CONNECTION.model("Table", tableSchema);
