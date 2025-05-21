module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OrderItemDtls', {
    order_item_id: { type: DataTypes.INTEGER, primaryKey: true },
    order_id: DataTypes.INTEGER,
    zaapko_order_id: DataTypes.INTEGER,
    order_item_sku: DataTypes.STRING,
    order_item_name: DataTypes.STRING,
    order_item_weight: DataTypes.DECIMAL(10, 2),     
    order_item_qty: DataTypes.INTEGER,
    order_item_price: DataTypes.DECIMAL(10, 2),        
    order_item_company : DataTypes.STRING,
    order_logisitcs_company : DataTypes.STRING,
    order_item_tax_percentage : DataTypes.DECIMAL(10, 2),
    order_item_tax_value : DataTypes.DECIMAL(10, 2),     
    createdby: DataTypes.STRING,
    modifiedby: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  },
  {
    tableName: 'tbl_order_items_dtls',
    timestamps: false
  });
};
