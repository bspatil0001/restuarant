var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tableSchema = new Schema({
  rate: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  restuarant: {
    type: Schema.Types.ObjectId,
    ref: "Restuarant",
    required: true
  }
});

tableSchema.statics.QueryData = function(query, sort, cb){
  var qry = this.find(query);
  // qry.sort
  qry.exec(cb || console.log);
}


module.exports = DB_CONNECTION.model('Review', tableSchema);
