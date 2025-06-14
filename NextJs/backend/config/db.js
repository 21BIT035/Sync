const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbA = new Sequelize(
  process.env.DB_A_NAME, 
  process.env.DB_A_USER,
  process.env.DB_A_PASSWORD || '',
  {
    host: process.env.DB_A_HOST,
    dialect: 'mysql',
    port: process.env.DB_A_PORT || 3306,
    logging: false
  }
);

const dbB = new Sequelize(
  process.env.DB_B_NAME,
  process.env.DB_B_USER,
  process.env.DB_B_PASSWORD || '',
  {
    host: process.env.DB_B_HOST,
    dialect: 'mysql',
    port: process.env.DB_B_PORT || 3306,
    logging: false
  }
);

async function authenticateDatabases() {
  try {
    await dbA.authenticate();
    console.log('Connected to Database A (zaapko_prod)');
    await dbB.authenticate();
    console.log('Connected to Database B (zaapko_crm)');
  } catch (error) {
    console.error('Unable to connect to the databases:', error.message);
    throw error;
  }
}

module.exports = { dbA, dbB, authenticateDatabases };
