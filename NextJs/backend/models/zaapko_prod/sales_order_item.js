
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sales_order_item extends Model {
      static associate(models) {
      }
    }
    sales_order_item.init( {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    sku:DataTypes.STRING,
    name: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    weight: DataTypes.DECIMAL(12, 2),
    qty_ordered: DataTypes.DECIMAL(12,4),
    price: DataTypes.DECIMAL(20, 4),
    created_at: DataTypes.DATE,
    modified_at: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'sales_order_item',
    modelName: 'sales_order_item',
    timestamps: false,
    freezeTableName: true
  });

  return sales_order_item;
};
