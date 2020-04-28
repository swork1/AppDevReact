var mysql = require("mysql");

var conn = mysql.createConnection({
    host:   "ec2-18-217-134-54.us-east-2.compute.amazonaws.com",
    user:   "seth",
    password:   "7+pdJhyQ2+88o8wf",
    database:   "imageDB-seth"
});

conn.connect(function(err){
    if (err) {
        console.log("Error connecting to MYSQL", err);
    }
    else{
        console.log("Connection established");
    }
});

module.exports = conn;