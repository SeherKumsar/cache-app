const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "mysql-service",
  user: "root",
  password: "password",
  database: "app",
  port: 3310,
  connectTimeout: 100,
});

module.exports = pool;