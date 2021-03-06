var express = require('express');
var app = express();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || "postgres://oqpzxczkciibli:5b5de3372bb40fe8f55c5bf35ce7ca71b336ac5896b1a17a2bbb3986a4e7ef09@ec2-50-19-249-121.compute-1.amazonaws.com:5432/d7ojm8b9t6semb";
const pool = new Pool({connectionString: connectionString});
                                                   //"postgres://wylhwmmdlpyhrn:2f8c5edd5ed7cc0cc7f0191640c94742add7ddcd83b83d6087429a6e34d2562f@ec2-23-21-201-12.compute-1.amazonaws.com:5432/d4i4q4a7me4ad8";
console.log("connectionString  = " + connectionString);


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.get('/getUser', function(request, response) {
   getUser(request, response);
});

// app.get('/getSport', function(request, response) {
//    getSport(request, response);
// });

app.listen(app.get('port'), function() {
   console.log("Node is running on port", app.get('port'));
});




// function getSport(request, response) {

//    var id = request.query.id;

//    getSportFromDb(id, function(error, result) {

//       if (error || result == null || result.length != 1) {
//          response.status(500).json({success: false, data: error});
//       } else {
//          var user = result[0];
//          response.status(200).json(result[0]);
//       }
//    });
// }

// function getSportFromDb(id, callback) {

//    console.log("getting Sport form DB with id: " + id);

//    var sql = "SELECT ";

//    var params = [id];

//    pool.query(sql, params, function(err, result) {

//       if (err) {
//          console.log("Error in query: ")
//          console.log(err);
//          callback(err, null);
//       }

//       console.log("Found result: " + JSON.stringify(result.rows));

//       callback(null, result.rows);
//    });

// }


function getUser(request, response) {

   var id = request.query.id;
   getUserFromDb(id, function(error, result) {

      if (error || result == null || result.length != 1) {
         console.log("this is the result: " + result);
         response.status(500).json({success: false, data: error});
      } else {
         var user = result[0];
         response.status(200).json(result[0]);
      }
   });
}

function getUserFromDb(id, callback) {

   console.log("getting user from DB with id: " + id);

  // var sql = "SELECT id, display_name, username, password FROM users WHERE id = 1";
    var sql = 'SELECT id FROM users WHERE id = $1::int';

   var params = [id];
   //var params = "1";

   pool.query(sql, params, function(err, result) {

      if (err) {

         callback(err, "yes");
         console.log("Error in query: ");
         console.log(err);
      }
     //console.log("Found result: " + JSON.stringify(result[0]));

      callback(null, result);
   });

}