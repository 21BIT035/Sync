const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sales_order extends Model{
      static associate(models){

      }
  }
sales_order.init(
  {
    entity_id: { type: DataTypes.INTEGER, primaryKey: true },
    status: DataTypes.STRING,
    increment_id: DataTypes.STRING,
    grand_total: DataTypes.DECIMAL(20, 4),
    customer_email: DataTypes.STRING,
    customer_firstname: DataTypes.STRING,
    customer_middlename: DataTypes.STRING,
    customer_lastname: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    modified_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'sales_order',
    timestamps: false,
    sequelize,
    modelName: "sales_order",
    freezeTableName: true,
  });
    return sales_order;
};