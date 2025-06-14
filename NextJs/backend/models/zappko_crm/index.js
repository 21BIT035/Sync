const { Sequelize } = require('sequelize')
const { dbB } = require('../../config/db')
const  tbl_order_main = require('./tbl_order_main')(dbB, require('sequelize').DataTypes);
const tbl_order_items_dtls = require('./tbl_order_items_dtls')(dbB, require('sequelize').DataTypes);

module.exports={tbl_order_main , tbl_order_items_dtls};

