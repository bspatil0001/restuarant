ROOT_FOLDER = __dirname;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var constant = require(ROOT_FOLDER + "/config/constant");

var app = express();

var index = require('./routes/index');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res._response = function(result, statusMessage, status, code, message) {
    var output = {};
    output.statusCode = code || R_S_OK;
    output.statusMessage = statusMessage;
    output.status = status || R_T_SUCCESS;
    output.response = result;
    res.json(output);
  };
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Mime-Type, Process-Data, Content-Type, Accept, Authorization');
  next();
});


// app.use('/', index);

app.get("/", function(req, res, next) {
    res.json(('Api is working fine.'));
});

app.use("/api", require(PATH_ROUTES + "index"));


// app.use(function(err, req, res, next) {
//     var response = {};
//     response.statusCode = err.status || R_S_ERROR;
//     response.statusMessage = err.statusMessage || err.message || "Unknown Error";
//     response.errors = err.errors || "";
//     response.status = "fail";
//     res.json(response);
// });

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        var response = {};
        response.statusCode = err.status || R_S_ERROR;
        response.statusMessage = err.statusMessage || err.message || "Unknown Error";
        response.errors = err.errors || "";
        response.status = "fail";
        res.json(response);
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    var response = {};
    response.statusCode = err.status || R_S_ERROR;
    response.statusMessage = err.statusMessage || err.message || "Unknown Error";
    response.errors = err.errors || "";
    response.status = "fail";
    res.json(response);
});




module.exports = app;
