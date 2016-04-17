//this is the controller for trips related database work and sending that data to the controllers


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

exports.getTripsByDriverId = function(req,res) {

    var error = [];
    var status = [];

    var driverId = req.body.driverId;
    var tripId = req.body.tripId;

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            console.log("The error in getTripsByDriverId in connecting to the db is: " + err);
            res.json({error: "Oops! There was an error in connecting to the db."});
            return;
        }
        connection.beginTransaction(function(err){
            console.log('connected as id ' + connection.threadId);

            //var query = ModelFunctionName.getAyQuery(driverId, tripId);

            var query = "";

            connection.query(query,[],function(err,rows){
                if(err) {
                    connection.rollback(function(){
                        connection.release();
                        console.log("The error in getTripsByDriverId in retrieving the data is: " + err);
                        res.json({error: "Oops! There was an error in retrieving the data from db."});
                        return;
                    });
                }
                else{

                    console.log("Data retrieved successfull and the data is: " + JSON.stringify(rows));
                    res.json({
                        success: 'Data of all Trips by Driver Id sent successfully',
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
};//getAccelerationY function ends


// for explicit based exporting - module.exports