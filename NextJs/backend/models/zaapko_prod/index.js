const { Sequelize } = require('sequelize')
const { dbA } = require('../../config/db')
const sales_order = require('./sales_order')(dbA, require('sequelize').DataTypes);
const sales_order_item = require('./sales_order_item')(dbA, require('sequelize').DataTypes);


sales_order.hasMany(sales_order_item, { foreignKey: 'order_id' });
sales_order_item.belongsTo(sales_order, { foreignKey: 'order_id' });



module.exports={sales_order , sales_order_item};

