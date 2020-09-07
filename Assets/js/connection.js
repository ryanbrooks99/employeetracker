var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Setting port
  port: 3306,

  // username
  user: "root",

  // password
  password: "rootroot",
  database: "tracker_db"
});
 // making connection or throw error
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

module.exports = connection;