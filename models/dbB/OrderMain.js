module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OrderMain', {
    crm_entity_id: { type: DataTypes.INTEGER, primaryKey: true },
    zapko_entity_id: DataTypes.INTEGER,
    order_status: DataTypes.STRING,
    zaapko_order_id: DataTypes.STRING,
    order_grand_total: DataTypes.STRING,                    
    order_customer_email: DataTypes.STRING,
    order_customer_firstname: DataTypes.STRING,
    order_customer_lastname: DataTypes.STRING,
    is_po_created: DataTypes.BOOLEAN,
    is_invoice_generated: DataTypes.BOOLEAN,
    createdby: DataTypes.STRING,
    modifiedby: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: 'tbl_order_main',
    timestamps: false
  });
};
