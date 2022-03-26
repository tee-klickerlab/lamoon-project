const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST || "localhost",
  user: process.env.MYSQL_DB_USERNAME || "root",
  password: process.env.MYSQL_DB_PASSWORD || "freedom123",
  database: process.env.APP_NAME || "lamoon",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database");
  }
});

module.exports = connection;
