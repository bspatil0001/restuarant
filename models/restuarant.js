var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tableSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  cuisines:{
    type:String,
    enum: ['multi','normal']
  },
  location:{
    type: String,
    required: true
  }
});

tableSchema.statics.QueryData = function(query, sort, cb){
  console.log(query);
  var qry = this.find(query);
  // if (sort)
  //     qry.sort(sort);
  qry.exec(cb || console.log);
}


module.exports = DB_CONNECTION.model("Restuarant", tableSchema);
