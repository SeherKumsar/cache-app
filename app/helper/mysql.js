const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "mysql-service", // 10.99.134.202
  user: "root",
  password: "password",
  database: "app",
  port: 3310,
  connectTimeout: 100, // default connect timeout is 10 seconds
});

module.exports = connection;
