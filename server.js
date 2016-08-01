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
var newFileController = require('./controllers/newFileController');
var emailController = require('./services/emailService');

//connect to the mysql db 
//var db = something something

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(bodyParser.json({}));

var enableCORS = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        //console.log("enablecors");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        //console.log("enablingcors");
 // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        //console.log(JSON.stringify(req),null,4);
    // intercept OPTIONS method
    //if ('OPTIONS' == req.method) {
     // res.send(200);
    //}
   // else {
      next();
//    }
};

app.use(enableCORS);



var router = express.Router();


//create the API endpoint handlers 

//router.route('/login')
//	.post(userController.loginUser);


// router.route('/getDrivers')
// 	.post(driverController.getAllDrivers);

// router.route('/driver-signup')
// 	.post(driverController.postDrivers);	

// router.route('/driver-login')
// 	.post(driverController.authenticateDrivers);

// router.route('/getTrips')
// 	.post(tripController.getTripsByDriverId);

router.route('/getAy')
	.post(dataController.getAccelerationY);

router.route('/getScores')
	.post(dataController.getDriverScores);

router.route('/getEvents')
	.post(dataController.getEvents);


router.route('/getLocation')
	.post(dataController.getLocation);


// router.route('/newFile')
// 	.post(newFileController.newFileTrigger);


router.route('/contactUs')
	.post(emailController.postContactMessage);	


//app should use router with /api prefix
app.use('/api', router);


app.get('/', function(req, res) {
	res.send("Hello World!\n");
});




//create server and listen on port
var server = http.createServer(app).listen(port, function() {
	console.log("The Driven Analytics server is running on port: " + port);
});

