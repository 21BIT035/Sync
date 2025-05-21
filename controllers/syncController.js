const { Order, OrderItem } = require('../models/dbA');
const { OrderMain, OrderItemDtls } = require('../models/dbB');

const syncData = async (req, res) => {
  try {
const orders = await Order.findAll();
const items = await OrderItem.findAll();


    for (const order of orders) {
      await OrderMain.findOrCreate({
        where: {
          zaapko_order_id: order.increment_id
        },
        defaults: {
          zapko_entity_id: order.entity_id,
          order_status: order.status,
          order_grand_total: order.grand_total,
          order_customer_email: order.customer_email,
          order_customer_firstname: order.customer_firstname,
          order_customer_lastname: order.customer_lastname,
          createdAt: order.created_at,
          modifiedAt: order.updated_at
        }
      });
    }

    for (const item of items) {
      await OrderItemDtls.findOrCreate({
        where: {
          zaapko_order_id: item.order_id,
          order_item_sku: item.sku
        },
        defaults: {
          order_item_name: item.name,
          order_item_weight: item.weight,
          order_item_qty: item.qty_ordered,
          order_item_price: item.price,
          createdAt: item.created_at,
          modifiedAt: item.updated_at
        }
      });
    }

    res.render('result', { message: 'Data sync completed using Sequelize!' });
  } catch (err) {
    res.render('result', { message: `Error: ${err.message}` });
  }
};

module.exports = { syncData };
