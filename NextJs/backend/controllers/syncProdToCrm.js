const { sales_order, sales_order_item } = require('../models/zaapko_prod/index');
const { tbl_order_main, tbl_order_items_dtls } = require('../models/zappko_crm/index');
const OrderMainQueries = require('../controllers/queries/orderMainQueries');
const ItemMainQueries = require('../controllers/queries/itemMainQueries');

const statusMap = {
  pending: 0,
  processing: 1,
  complete: 2,
  canceled: 3,
  holded: 4,
  closed: 5,
};

exports.syncProdToCrm = async (req, res) => {
  console.log("Sync started");

  try {
    const orders = await sales_order.findAll();
    const items = await sales_order_item.findAll();

    const syncedOrders = [];

    for (const order of orders) {
      if (!order.increment_id) {
        console.warn("Skipping order with missing increment_id:", order);
        continue;
      }

      const existingOrder = await tbl_order_main.findOne({
        where: { zaapko_order_id: order.increment_id }
      });

      if (existingOrder) {
        console.log(`Order ${order.increment_id} already synced. Skipping.`);
        continue;
      }

      const statusInt = statusMap[order.status?.toLowerCase()] ?? 0;

      const orderParams = {
        zaapko_order_id: order.increment_id,
        zapko_entity_id: order.entity_id,
        order_status: statusInt,
        order_grand_total: order.grand_total,
        order_customer_email: order.customer_email,
        order_customer_firstname: order.customer_firstname,
        order_customer_lastname: order.customer_lastname,
        is_po_created: 2 || is_po_created,
        is_invoice_generated: 1 || is_invoice_generated,
        created_by: order.created_by || 1,
        modified_by: order.modified_by || 1,
        created_at: order.created_at,
        modified_at: order.modified_at,
      };

      const OrderSync = await new OrderMainQueries(orderParams).create();

      const orderItems = items.filter(item => item.order_id === order.entity_id);

      for (const item of orderItems) {
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

      syncedOrders.push(OrderSync);
    }

    if (syncedOrders.length > 0) {
      return res.status(200).json({
        message: 'Orders and items synced successfully!',
        syncedOrdersCount: syncedOrders.length,
        data: syncedOrders
      });
    } else {
      return res.status(200).json({
        message: 'All Orders are Synced...',
        syncedOrdersCount: 0,
        data: []
      });
    }

  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ message: 'Sync failed', error: error.message });
  }
};
