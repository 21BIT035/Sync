module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OrderItem', {
    order_id: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    weight: DataTypes.DECIMAL(10, 2),             
    qty_ordered: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),              
    price_incl_tax: DataTypes.DECIMAL(10, 2),     
    base_price: DataTypes.DECIMAL(10, 2),         
    base_cost: DataTypes.DECIMAL(10, 2),         
    original_price: DataTypes.DECIMAL(10, 2),   
    base_original_price: DataTypes.DECIMAL(10, 2),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: 'sales_order_item',
    timestamps: false
  });
};
