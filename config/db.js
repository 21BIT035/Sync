const mysql = require('mysql2/promise');
require('dotenv').config();

const dbA = mysql.createPool({
  host: process.env.DB_A_HOST,
  port: process.env.DB_A_PORT,
  user: process.env.DB_A_USER,
  password: process.env.DB_A_PASSWORD,
  database: process.env.DB_A_DATABASE,
});

const dbB = mysql.createPool({
  host: process.env.DB_B_HOST,
  port: process.env.DB_B_PORT,
  user: process.env.DB_B_USER,
  password: process.env.DB_B_PASSWORD,
  database: process.env.DB_B_DATABASE,
});


module.exports = { dbA, dbB };
