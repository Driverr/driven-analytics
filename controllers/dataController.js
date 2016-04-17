//this is the controller for all database fetches, JSON operations on them and sending requested data to views


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

//function dataController() {}; //creating the dataController class which will have the functions inside of it

exports.getAccelerationY = function(req,res) {

    var error = [];
    var status = [];

    var driverId = req.body.driverId;
    var tripId = req.body.tripId;

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            console.log("The error in getAy connecting to the db is: " + err);
            //res.json({error: "Oops! There was an error in connecting to the db."});
            res.json({error: JSON.stringify(err)});
            return;
        }
        connection.beginTransaction(function(err){
            console.log('connected as id ' + connection.threadId);

            //var query = ModelFunctionName.getAyQuery(driverId, tripId);

            var query = "select timestamp, ay_max as high, ay_min as low, ay_avg as open, ay_avg as close from trip_details where driver_id = 0 and trip_id = 1 group by timestamp";

            connection.query(query,[],function(err,rows){
                if(err) {
                    connection.rollback(function(){
                        connection.release();
                        console.log("The error in getAy retrieving from db is: " + err);
                        res.json({error: "Oops! There was an error in retrieving the data from db."});
                        return;
                    });
                }
                else{

                    console.log("Data retrieved successfull and the data is: " + JSON.stringify(rows));

                    var newRows = fixTimeStamp(rows);

                    res.json({
                        success: 'Data for Ay sent successfully',
                        data: newRows
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
};//getAccelerationY function ends


function fixTimeStamp (rows) {
    var time = (new Date).getTime();

    for (i = 0; i < rows.length; i++) {
        
        rows[i].timestamp = time; //changing the timestamp value to current epoch based
        time = time + 1000; //increasing by 1000 milisecond for every reading
    }

    console.log("the fixTimeStamp function changes the rows to: " + rows);

    return (rows);
}


// for explicit based exporting - module.exports