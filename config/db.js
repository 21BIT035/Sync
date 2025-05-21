const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbA = new Sequelize(
  process.env.DB_A_NAME,
  process.env.DB_A_USER,
  process.env.DB_A_PASSWORD,
  {
    host: process.env.DB_A_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false
  }
);

const dbB = new Sequelize(
  process.env.DB_B_NAME,
  process.env.DB_B_USER,
  process.env.DB_B_PASSWORD,
  {
    host: process.env.DB_B_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false
  }
);

module.exports = { dbA, dbB };
