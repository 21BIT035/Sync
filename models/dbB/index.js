const { Sequelize } = require('sequelize')
const { dbB } = require('../../config/db')
const  OrderMain = require('./OrderMain')(dbB, require('sequelize').DataTypes);
const OrderItemDlts = require('./OrderItemDlts')(dbB, require('sequelize').DataTypes);

module.exports={OrderMain , OrderItemDlts};

