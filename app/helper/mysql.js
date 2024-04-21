const mysql = require("mysql2");

const connection = mysql.createPool({
  connectionLimit: 100, // 100 tane bağlantı oluşturabilir
  host: "10.99.134.202",
  user: "root",
  port: "3310",
  password: "password",
  database: "app",
});

module.exports = connection;
