//this is the controller for all database fetches, JSON operations on them and sending requested data to views


var mysql     =    require('mysql');
var moment    =    require('moment');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'drivendb.c777xq6yyhhm.ap-southeast-1.rds.amazonaws.com',
    user     : 'drivenuser',
    password : 'drivenbits',
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

            //var query = "select timestamp as datetime, ay_max as high, ay_min as low, ay_avg as open, ay_avg as close from trip_details where driver_id = 0 and trip_id = 1 group by timestamp";
            var query = "select timestamp as x, ay_avg as y from trip_details where driver_id = 0 and trip_id = 1 and ay_avg between -0.42 and .74 group by timestamp";

            connection.query(query,[],function(err,rows){
                if(err) {
                    connection.rollback(function(){
                        connection.release();
                        console.log("The error in getAy retrieving from DB is: " + err);
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
};//exported getAccelerationY function ends


function fixTimeStamp (rows) {
    var time = (new Date).getTime();

    for (i = 0; i < rows.length; i++) {
        
        rows[i].x = time; //changing the timestamp value to current epoch based
        time = time + 1000; //increasing by 1000 milisecond for every reading
        /*rows[i].high = rows[i].open;
        rows[i].close += 0.001; //to bring about a change in open and close
        rows[i].low = rows[i].close;*/
    }

    console.log("the fixTimeStamp function changes the rows to: " + JSON.stringify(rows));

    return (rows);
}



exports.getDriverScores = function(req, res){

    var error = [];
    var status = [];

    var driverId = req.body.driverId;
    var tripId = req.body.tripId;

    /* uncomment whole block while retrieving from actual db instead of dummy data 
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            console.log("The error in getScores connecting to the db is: " + err);
            //res.json({error: "Oops! There was an error in connecting to the db."});
            res.json({error: JSON.stringify(err)});
            return;
        }


        connection.beginTransaction(function(err){
            console.log('connected as id ' + connection.threadId);

            //use some kind of query like below to get the driver scores from the db
            var query = "select timestamp as x, overall_score as y from trip_details where driver_id = 0 and trip_id = 1 group by timestamp";

            connection.query(query,[],function(err,rows){
                if(err) {
                    connection.rollback(function(){
                        connection.release();
                        console.log("The error in getScores retrieving from DB is: " + err);
                        res.json({error: "Oops! There was an error in retrieving the data from db."});
                        return;
                    });
                }
                else{

                    console.log("Data retrieved successfully in getScores and the data is: " + JSON.stringify(rows));

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

uncomment whole block while retrieving from actual db instead of dummy data */


//dummy data for now about the scores
var newRows = [
    {
      "x": 1462125381603,
      "y": 67
    },
    {
      "x": 1462126382603,
      "y": 69
    },
    {
      "x": 1462127383603,
      "y": 70
    },
    {
      "x": 1462128384603,
      "y": 70
    },
    {
      "x": 1462129385603,
      "y": 69
    },
    {
      "x": 1462130386603,
      "y": 70
    },
    {
      "x": 1462131387603,
      "y": 71
    },
    {
      "x": 1462132388603,
      "y": 72
    },
    {
      "x": 1462133389603,
      "y": 73
    },
    {
      "x": 1462134390603,
      "y": 74
    },
    {
      "x": 1462135388603,
      "y": 74
    },
    {
      "x": 1462136389603,
      "y": 75
    },
    {
      "x": 1462137390603,
      "y": 75
    },
    {
      "x": 1462138388603,
      "y": 76
    },
    {
      "x": 1462139389603,
      "y": 77
    },
    {
      "x": 1462140390603,
      "y": 77
    }
];

var avg_Score = (67+69+70+70+69+70+71+72+73+74+74+75+75+76+77+77)/16;

    res.json({
                success: 'Data for getScores sent successfully',
                data: newRows,
                over_score: avg_Score
            });





}//getDriverScores ends here   


exports.getEvents = function(req, res){

    var error = [];
    var status = [];

    var driverId = req.body.driverId;
    var tripId = req.body.tripId;

    /* uncomment whole block while retrieving from actual db instead of dummy data 
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            console.log("The error in getScores connecting to the db is: " + err);
            //res.json({error: "Oops! There was an error in connecting to the db."});
            res.json({error: JSON.stringify(err)});
            return;
        }


        connection.beginTransaction(function(err){
            console.log('connected as id ' + connection.threadId);

            //use some kind of query like below to get the driver scores from the db
            var query = "select timestamp as x, overall_score as y from trip_details where driver_id = 0 and trip_id = 1 group by timestamp";

            connection.query(query,[],function(err,rows){
                if(err) {
                    connection.rollback(function(){
                        connection.release();
                        console.log("The error in getScores retrieving from DB is: " + err);
                        res.json({error: "Oops! There was an error in retrieving the data from db."});
                        return;
                    });
                }
                else{

                    console.log("Data retrieved successfully in getScores and the data is: " + JSON.stringify(rows));

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

uncomment whole block while retrieving from actual db instead of dummy data */




//dummy data for now about the scores
var newRows = [
    {
      "label": "Hard Breaking",
      "value": 11
    },
    {
      "label": "Hard Turns",
      "value": 4
    },
    {
      "label": "Rash Acceleration",
      "value": 15
    }
];

    res.json({
                success: 'Data for getScores sent successfully',
                data: newRows
            });





}//getEvents ends here   


exports.getHardAccs = function(req,res) {

    var error = [];
    var status = [];

    var driverId = req.body.driverId;
    var tripId = req.body.tripId;

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            console.log("The error in getHA connecting to the db is: " + err);
            //res.json({error: "Oops! There was an error in connecting to the db."});
            res.json({error: JSON.stringify(err)});
            return;
        }
        connection.beginTransaction(function(err){
            console.log('connected as id ' + connection.threadId);

            //var query = ModelFunctionName.getAyQuery(driverId, tripId);

            //var query = "select timestamp as datetime, ay_max as high, ay_min as low, ay_avg as open, ay_avg as close from trip_details where driver_id = 0 and trip_id = 1 group by timestamp";
            var query = "select timestamp as x, ay as y from trip_details where driver_id = 0 and trip_id = 1 group by timestamp";

            connection.query(query,[],function(err,rows){
                if(err) {
                    connection.rollback(function(){
                        connection.release();
                        console.log("The error in getHA retrieving from DB is: " + err);
                        res.json({error: "Oops! There was an error in retrieving the data from db."});
                        return;
                    });
                }
                else{

                    console.log("Data retrieved successfull and the data is: " + JSON.stringify(rows));

                    var HA_data = calc_HA(rows);

                    res.json({
                        success: 'Data for HA sent successfully',
                        data: HA_data
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
};//exported getAccelerationY function ends


function calc_HA (rows) {

   // code for calculating max and min for every 3 seconds 
   //more efficient - extract this in a separate function that will return a JSON object of these 4 arrays?


    max_values = []; //length will be rows.length - 3
    max_times = []; //length will be rows.length - 3 
    min_values = []; //length will be rows.length - 3
    min_times = []; //length will be rows.length - 3

    max_diff = 0;
    diff=0;

    for(i=0; i<(rows.length-2); i++) {
       //say rows.y has LaY and rows.x has time
       max_values[i] = rows.y[i];
       max_times[i] = rows.x[i];
       min_values[i] = rows.y[i];
       min_times[i] = rows.x[i];

       for(j=i; j<i+3; j++) {
            if(rows.y[j]>max_values[i]) {
                max_values[i] = rows.y[j];
                max_times[i] = rows.x[j];
            }
            if(rows.y[j]<min_values[i]) {
                min_values[i] = rows.y[j];
                min_times[i] = rows.x[j];
            }
            
            max_diff = ((max_values[i]-min_values[i])>max_diff) ? (max_values[i]-min_values[i]) : max_diff;

       } //for j loop ends
    }//for i loop ends

ha_events = [];

for(i=0; i<(rows.length-2);i++) {

    diff = max_values[i] - min_values[i];
    if( diff>(0.66*max_diff) )
        ha_events[i] = i
}






    //write separate logic to compose JSON of data

    console.log("the calc_HA function is sending this data back: " + JSON.stringify(data));

    return (data);
}





var lat = 19.110834, lon = 72.886355;

exports.getLocation = function(req, res){

    var error = [];
    var status = [];

    var driverId = req.body.driverId;
    var tripId = req.body.tripId;

    if(driverId!=0 || tripId!=1) {
        console.log("Wrong driver or trip ID!");
        res.json({error:'incorrect ids'});
        return;
    }

    /* uncomment whole block while retrieving from actual db instead of dummy data 
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            console.log("The error in getScores connecting to the db is: " + err);
            //res.json({error: "Oops! There was an error in connecting to the db."});
            res.json({error: JSON.stringify(err)});
            return;
        }


        connection.beginTransaction(function(err){
            console.log('connected as id ' + connection.threadId);

            //use some kind of query like below to get the driver scores from the db
            var query = "select timestamp as x, overall_score as y from trip_details where driver_id = 0 and trip_id = 1 group by timestamp";

            connection.query(query,[],function(err,rows){
                if(err) {
                    connection.rollback(function(){
                        connection.release();
                        console.log("The error in getScores retrieving from DB is: " + err);
                        res.json({error: "Oops! There was an error in retrieving the data from db."});
                        return;
                    });
                }
                else{

                    console.log("Data retrieved successfully in getScores and the data is: " + JSON.stringify(rows));

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

uncomment whole block while retrieving from actual db instead of dummy data */

    lat = lat + 0.000010;
    lon = lon + 0.000020;

    if(lat>19.999999 || lon>72.999999) {
        lat = 19.110834; 
        lon = 72.886355;
    }
    
    var newLocation = { "location": 
                        [{"latitude": lat, "longitude": lon}]
                        };

    res.json({
                success: 'Data for getLocation sent successfully',
                data: newLocation
            });
    return;



}//getLocation ends here   


// for explicit based exporting - module.exports