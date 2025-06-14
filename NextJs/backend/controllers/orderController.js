const { Order, OrderItem } = require('../models/zaapko_prod');
const { OrderMain, OrderItemDtls } = require('../models/zappko_crm');

const statusMap = {
  pending: 0,
  processing: 1,
  complete: 2,
  canceled: 3,
  holded: 4,
  closed: 5,
};

exports.createOrSyncOrder = async (req, res) => {
  try {
    const bodyData = req.body;

    if (Object.keys(bodyData).length > 0) {
      const {
        zapko_entity_id,
        order_status,
        zaapko_order_id,
        order_grand_total,
        order_customer_email,
        order_customer_firstname,
        order_customer_lastname,
        is_po_created,
        is_invoice_generated,
        createdBy,
        updatedBy,
        created_at,
        updated_at
      } = bodyData;

      if (!zaapko_order_id || !order_customer_email || !order_status) {
        return res.status(400).json({
          message: 'Required fields missing: zaapko_order_id, order_customer_email, order_status'
        });
      }

      const statusInt = statusMap[order_status?.toLowerCase()] ?? 0;

      const newOrder = await OrderMain.create({
        zapko_entity_id,
        order_status: statusInt,
        zaapko_order_id,
        order_grand_total,
        order_customer_email,
        order_customer_firstname,
        order_customer_lastname,
        is_po_created: is_po_created || false,
        is_invoice_generated: is_invoice_generated || false,
        createdBy: createdBy || 1,
        updatedBy: updatedBy || 1,
        created_at,
        updated_at
      });

      return res.status(201).json({ message: 'Order created successfully', data: newOrder });
    }

    const orders = await Order.findAll();
    const items = await OrderItem.findAll();

    for (const order of orders) {
      const statusInt = statusMap[order.status?.toLowerCase()] ?? 0;

      await OrderMain.findOrCreate({
        where: {
          zaapko_order_id: order.increment_id
        },
        defaults: {
          zapko_entity_id: order.entity_id,
          order_status: statusInt,
          order_grand_total: order.grand_total,
          order_customer_email: order.customer_email,
          order_customer_firstname: order.customer_firstname,
          order_customer_lastname: order.customer_lastname,
          is_po_created: false,
          is_invoice_generated: false,
          createdBy: 1,
          updatedBy: 1,
          created_at: order.created_at,
          updated_at: order.updated_at
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
          order_id: item.order_id,
          order_item_name: item.name,
          order_item_weight: item.weight,
          order_item_qty: item.qty_ordered,
          order_item_price: item.price,
          order_item_company: null,
          order_logisitcs_company: null,
          order_item_tax_percentage: 0,
          order_item_tax_value: 0,
          createdBy: 1,
          updatedBy: 1,
          created_at: item.created_at,
          updated_at: item.updated_at
        }
      });
    }

    return res.status(200).json({ message: 'Data synced from dbA to dbB successfully!' });
  } catch (error) {
    console.error('Error in createOrSyncOrder:', error);
    return res.status(500).json({ message: 'Operation failed', error: error.message });
  }
};
