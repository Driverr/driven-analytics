//Main server file for the analytics APIs

//load required packages here

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var http = require('http');

var app = express();
var port = process.env.PORT || 9000;

//import the controllers here
var driverController = require('./controllers/driverController');
var tripController = require('./controllers/tripController');
var dataController = require('./controllers/dataController');

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


router.route('/getDrivers')
	.get(driverController.getAllDrivers);


router.route('/getTrips')
	.post(tripController.getTripsByDriverId);

router.route('/getAy')
	.post(dataController.getAccelerationY);


//app should use router with /api prefix
app.use('/api', router);


app.get('/', function(req, res) {
	res.send("Hello World!\n");
});




//create server and listen on port
var server = http.createServer(app).listen(port, function() {
	console.log("The Driven Analytics server is running on port: " + port);
});

