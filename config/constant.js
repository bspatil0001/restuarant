ENVIRONMENT = "development";
var mongoose = require("mongoose");

DB_CONNECTION_STRING = "mongodb://localhost:27017/restuarant";
DB_CONNECTION = mongoose.connect(DB_CONNECTION_STRING);

BASE_URL = "http://localhost";
PATH_SERVICES = ROOT_FOLDER + "/services/";
PATH_MODELS = ROOT_FOLDER + "/models/";
PATH_ROUTES = ROOT_FOLDER + "/routes/";
PATH_VALIDATOR = ROOT_FOLDER + "/validation/"

//controllers path
RESTUARANT_CONTROLLER = ROOT_FOLDER + "/controllers/restuarant";
TABLE_CONTROLLER = ROOT_FOLDER + "/controllers/table";
USER_CONTROLLER = ROOT_FOLDER + "/controllers/user";
REVIEW_CONTROLLER = ROOT_FOLDER + "/controllers/review";

//middleware path
TABLE_MIDDLEWARE = ROOT_FOLDER + "/middleware/table";


//model schemas
SCHEMA_RESTUARANT = require(PATH_MODELS + "restuarant");
SCHEMA_TABLE = require(PATH_MODELS + "table");
SCHEMA_BOOKING = require(PATH_MODELS + "booking");
SCHEMA_REVIEW = require(PATH_MODELS + "review");

//VALIDATION_RULES
VALIDATOR = PATH_VALIDATOR + 'validator';

//response code constants
R_S_OK = 200;
R_S_NOT_FOUND = 404;
R_S_ERROR = 500;

//response string constants
R_T_SUCCESS = "success";
R_T_FAIL = "fail";
