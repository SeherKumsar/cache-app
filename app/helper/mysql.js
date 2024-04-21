const mysql = require("mysql2");

const connection = mysql.createPool({
  connectionLimit: 100, // 100 tane bağlantı oluşturabilir
  host: "10.244.0.236",
  user: "root",
  port: "3306",
  password: "password",
  database: "app",
});

module.exports = connection;
