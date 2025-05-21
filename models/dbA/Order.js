module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Order', {
    entity_id: { type: DataTypes.INTEGER, primaryKey: true },
    status: DataTypes.STRING,
    increment_id: DataTypes.STRING,
    grand_total: DataTypes.DECIMAL(10,2),
    customer_email: DataTypes.STRING,
    customer_firstname: DataTypes.STRING,
    customer_lastname: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  },
  {
    tableName: 'sales_order',
    timestamps: false
  });
};
