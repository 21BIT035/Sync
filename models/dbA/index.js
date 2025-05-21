const { Sequelize } = require('sequelize')
const { dbA } = require('../../config/db')
const Order = require('./OrderItem')(dbA, require('sequelize').DataTypes);
const OrderItem = require('./OrderItem')(dbA, require('sequelize').DataTypes);

module.exports={Order , OrderItem};

