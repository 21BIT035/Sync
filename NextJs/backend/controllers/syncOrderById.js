const { Op } = require('sequelize');
const { sales_order, sales_order_item } = require('../models/zaapko_prod/index');
const { tbl_order_main, tbl_order_items_dtls } = require('../models/zappko_crm/index');
const OrderMainQueries = require('../controllers/queries/orderMainQueries');
const ItemMainQueries = require('../controllers/queries/itemMainQueries');

exports.syncOrderById = async (req, res) => {
  const { increment_id } = req.body;

  if (!increment_id) {
    return res.status(400).json({ message: 'Missing increment_id' });
  }

  try {
    const existingOrder = await tbl_order_main.findOne({
      where: { zaapko_order_id: increment_id }
    });

    if (existingOrder) {
      return res.status(200).json({ message: 'Order already synced', alreadySynced: true });
    }

    const order = await sales_order.findOne({ where: { increment_id } });
    if (!order) {
      return res.status(404).json({ message: 'Order not found in source database' });
    }

    const items = await sales_order_item.findAll({
      where: { order_id: order.entity_id }
    });

    const statusMap = {
      pending: 0,
      processing: 1,
      complete: 2,
      canceled: 3,
      holded: 4,
      closed: 5,
    };

    const statusInt = statusMap[order.status?.toLowerCase()] ?? 0;

    const orderParams = {
      zaapko_order_id: order.increment_id,
      zapko_entity_id: order.entity_id,
      order_status: statusInt,
      order_grand_total: order.grand_total,
      order_customer_email: order.customer_email,
      order_customer_firstname: order.customer_firstname,
      order_customer_lastname: order.customer_lastname,
      is_po_created: 2,
      is_invoice_generated: 1,
      created_by: order.created_by || 1,
      modified_by: order.modified_by || 1,
      created_at: order.created_at,
      modified_at: order.modified_at,
    };

    const OrderSync = await new OrderMainQueries(orderParams).create();

    for (const item of items) {
      if (!item.sku) continue;

      const itemParams = {
        zaapko_order_id: item.order_id,
        order_item_sku: item.sku,
        order_id: OrderSync.crm_entity_id,
        order_item_name: item.name,
        order_item_weight: item.weight,
        order_item_qty: item.qty_ordered,
        order_item_price: item.price,
        order_item_company: 1,
        order_logisitcs_company: 1,
        order_item_tax_percentage: 0,
        order_item_tax_value: 0,
        created_by: item.created_by || 1,
        modified_by: item.modified_by || 1,
        createdAt: item.created_at,
        modifiedAt: item.modified_at
      };

      await new ItemMainQueries(itemParams).create();
    }

    return res.status(200).json({
      message: 'Order synced successfully',
      alreadySynced: false,
      syncedOrder: OrderSync
    });

  } catch (err) {
    console.error('Error syncing order:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
