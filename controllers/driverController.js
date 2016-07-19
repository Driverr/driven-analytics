//this is the controller for driver related database work and sending that data to the controllers


var mysql     =    require('mysql');
var moment    =    require('moment');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'driven_analytics',
    timezone: 'utc',
    dateStrings : true,
    debug    :  false
});

//function driverController() {}; //creating the dataController class which will have the functions inside of it

exports.getAllDrivers = function(req,res) {

    var error = [];
    var status = [];

    if(req.body.userId == 'admin_1')
        userId = 'admin';
    else
        userId = 'user';
    

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            console.log("The error in getAllDrivers connecting to db is: " + err);
            res.json({error: "Oops! There was an error in connecting to the db."});
            return;
        }
        connection.beginTransaction(function(err){
            console.log('connected as id ' + connection.threadId);

            //var query = ModelFunctionName.getAyQuery(driverId, tripId);

            var query = "put query to get all driver details here";

            connection.query(query,[],function(err,rows){
                if(err) {
                    connection.rollback(function(){
                        connection.release();
                        console.log("The error in getAllDrivers retrieving from db is: " + err);
                        res.json({error: "Oops! There was an error in retrieving the data from db."});
                        return;
                    });
                }
                else{

                    console.log("Data retrieved successfull and the data is: " + JSON.stringify(rows));
                    res.json({
                        success: 'Data of all drivers sent successfully',
                        data: rows
                    });
                }
            });

            connection.on('error', function(){
                connection.rollback(function(){
                    connection.release();
                    console.log("The error in general connection is: " + err);
                    res.json({error: "Oops! There was an error while connecting to the db."});
                    return;
                });
            });//connection.on error ends
        });//connection.beginTransaction ends
    });//pool.getConnection ends
};//getAllDrivers function ends



//for driver registration end point
exports.postDrivers = function(req,res) { 

    var error = [];
    var status = [];

    if(req.body.userId == 'admin_1')
        userId = 'admin';
    else
        userId = 'user';
    

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            console.log("The error in getAllDrivers connecting to db is: " + err);
            res.json({error: "Oops! There was an error in connecting to the db."});
            return;
        }
        connection.beginTransaction(function(err){
            console.log('connected as id ' + connection.threadId);

            //var query = ModelFunctionName.getAyQuery(driverId, tripId);

            var query = "put query to get all driver details here";

            connection.query(query,[],function(err,rows){
                if(err) {
                    connection.rollback(function(){
                        connection.release();
                        console.log("The error in getAllDrivers retrieving from db is: " + err);
                        res.json({error: "Oops! There was an error in retrieving the data from db."});
                        return;
                    });
                }
                else{

                    console.log("Data retrieved successfull and the data is: " + JSON.stringify(rows));
                    res.json({
                        success: 'Data of all drivers sent successfully',
                        data: rows
                    });
                }
            });

            connection.on('error', function(){
                connection.rollback(function(){
                    connection.release();
                    console.log("The error in general connection is: " + err);
                    res.json({error: "Oops! There was an error while connecting to the db."});
                    return;
                });
            });//connection.on error ends
        });//connection.beginTransaction ends
    });//pool.getConnection ends
};//postDrivers function ends




//for driver authentication end point - do we need this?
exports.authenticateDrivers = function(req,res) { 

    var error = [];
    var status = [];

    if(req.body.userId == 'admin_1')
        userId = 'admin';
    else
        userId = 'user';
    

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            console.log("The error in getAllDrivers connecting to db is: " + err);
            res.json({error: "Oops! There was an error in connecting to the db."});
            return;
        }
        connection.beginTransaction(function(err){
            console.log('connected as id ' + connection.threadId);

            //var query = ModelFunctionName.getAyQuery(driverId, tripId);

            var query = "put query to get all driver details here";

            connection.query(query,[],function(err,rows){
                if(err) {
                    connection.rollback(function(){
                        connection.release();
                        console.log("The error in getAllDrivers retrieving from db is: " + err);
                        res.json({error: "Oops! There was an error in retrieving the data from db."});
                        return;
                    });
                }
                else{

                    console.log("Data retrieved successfull and the data is: " + JSON.stringify(rows));
                    res.json({
                        success: 'Data of all drivers sent successfully',
                        data: rows
                    });
                }
            });

            connection.on('error', function(){
                connection.rollback(function(){
                    connection.release();
                    console.log("The error in general connection is: " + err);
                    res.json({error: "Oops! There was an error while connecting to the db."});
                    return;
                });
            });//connection.on error ends
        });//connection.beginTransaction ends
    });//pool.getConnection ends
};//authenticateDriver function ends

/*

------------------------> copying driver controller codes from driven-serverr here for reference 


exports.postDrivers = function(req, res) {
    if( !req.body.email ) {
        res.json({ res: false,
            response: 'Missing email. Please provide your email id' });
        return;

    }

    if( !req.body.password ) {
        res.json({ res: false,
            response: 'Missing password. Please provide your password' });
        return;
    }

    var date = new Date().getTime();

    var padded = date.toString(16);
    padded = "dr_" + padded + "_15";

    var driver = new Driver ({
        driver_id: padded,
        //driver_name: req.body.name,
        //driver_number: req.body.number
        password: req.body.password,
        email: req.body.email
    });

    driver.save(function(err) {
        if (err){
            console.log("The error is:" + err);
            res.json({ res: false,
                response: 'Driver details already exists'});
            return;
        }
        
        else {
        console.log("Driver successfuly added with the following details: ");
        //console.log(driver.driver_id + ", " + driver.driver_name + ", " + driver.email + ", " + driver.number  );
        console.log(driver.driver_id + ", " +  driver.email   );
        res.json({ res: true,
            response: padded });    
        }
        
    });

};


/***********************************************
AUTHENTICATE Drivers 
***********************************************/
//Create endpoint /api/authenticate-driver for POST
/*

exports.authenticateDriver = function(req, res) {
    if( !req.body.email ) {
        res.json({ res: false,
            response: 'Missing email. Please provide your email id' });
        return;

    }

    if( !req.body.password ) {
        res.json({ res: false,
            response: 'Missing password. Please provide your password' });
        return;
    }


    Driver.findOne({driver_name: req.body.driver_name}, function(err, driver){
        if(!driver){
            res.json({ res: false,
                response: 'Driver does not exist'});
            return;
        }

        driver.verifyPassword(req.body.password, function(err, isMatch){
            if(err) {
                res.json({ res: false,
                    response: err});
                return;
            } else if(!isMatch) {
                res.json({ res: false,
                    response: 'Wrong password'});
            } else {
                res.json({ res: true,
                    response: 'authenticated'});
            }
        });
    });
};


------------------------>  ends here
*/



// for explicit based exporting - module.exports