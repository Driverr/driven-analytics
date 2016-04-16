//Main server file for the analytics APIs

//load required packages here

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var http = require('http');

var app = express();
var port = process.env.PORT || 5000;

//import the controllers here

//connect to the mysql db 
//var db = something something

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(bodyParser.json({}));

var router = express.Router();


//create the API endpoint handlers 

//router.route('/login')
//	.post(userController.loginUser);


//router.route('/getalldrivers')
	//.get(driverController.getDrivers);


//router.route('/getTrips')
//	.post(TripController.getAllTrips);



//app should use router with /api prefix
app.use('/api', router);


//create server and listen on port
var server = http.createServer(app).listen(port, function() {
	console.log("The Driven Analytics server is running on port: " + port);
});

