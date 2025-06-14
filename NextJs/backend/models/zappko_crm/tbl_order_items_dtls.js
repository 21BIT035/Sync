const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class tbl_order_items_dtls extends Model {
      static associate(models) {
      }
    }
    tbl_order_items_dtls.init(
        {
       zaapko_order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },    
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
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      order_item_company: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },

      order_item_name: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_item_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_item_qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_item_sku: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_item_weight: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_item_tax_percentage: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_item_tax_value: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      },
      order_logisitcs_company: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: "tbl_order_items_dtls",
      tableName: "tbl_order_items_dtls",
      freezeTableName: true,
    }
    );
  return tbl_order_items_dtls;
};
