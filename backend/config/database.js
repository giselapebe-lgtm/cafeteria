const mysql = require("mysql2/promise");

const conexion = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cafeteria",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = conexion;
