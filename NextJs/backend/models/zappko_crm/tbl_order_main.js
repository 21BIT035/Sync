const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_order_main extends Model {
      static associate(models) {
      }
    } 
    tbl_order_main.init(
       {
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      modified_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      modifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      is_po_created: {
        type: DataTypes.TINYINT,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false
      },
      is_invoice_generated: {
        type: DataTypes.TINYINT,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_customer_email: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      vat_amount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_customer_firstname: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_customer_lastname: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_grand_total: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      crm_entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      order_status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      zapko_entity_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      zaapko_order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      }
    },
    {
      sequelize,
      timestamps: false, 
      modelName: "tbl_order_main",
      tableName: "tbl_order_main",
      freezeTableName: true,
    }
    );
  return tbl_order_main;
};
