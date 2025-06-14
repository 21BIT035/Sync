const { Op } = require('sequelize');
const { sales_order, sales_order_item } = require('../models/zaapko_prod/index');
const { tbl_order_main } = require('../models/zappko_crm/index'); // crm model

exports.getDateOrdersWithItems = async (req, res) => {
  try {
    const { specific_date } = req.body;

    if (!specific_date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a specific_date in YYYY-MM-DD format',
      });
    }

    const parsedDate = new Date(specific_date);
    if (isNaN(parsedDate)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD format only.',
      });
    }

    const startDate = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endDate = new Date(parsedDate.setHours(23, 59, 59, 999));

    // ✅ Fetch CRM orders' zaapko_order_id values
    const crmOrders = await tbl_order_main.findAll({
      attributes: ['zaapko_order_id'],
    });
    const syncedIds = crmOrders.map(order => order.zaapko_order_id);

    // ✅ Fetch sales orders from prod
    const orders = await sales_order.findAll({
      where: {
        created_at: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: {
        model: sales_order_item,
        attributes: ['item_id', 'sku', 'name', 'qty_ordered', 'created_at'],
        required: false,
      },
      order: [['entity_id', 'ASC']],
    });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No orders found on ${specific_date}`,
      });
    }

    // ✅ Add crm_synced field by comparing increment_id with zaapko_order_id
    const enrichedOrders = orders.map(order => {
      const plain = order.get({ plain: true });
      return {
        ...plain,
        crm_synced: syncedIds.includes(order.increment_id), // correct mapping
      };
    });

    return res.status(200).json({
      success: true,
      message: `Items ordered on ${specific_date}`,
      total_orders: enrichedOrders.length,
      data: enrichedOrders,
    });

  } catch (error) {
    console.error('Error fetching data for date:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch data.',
      error: error.message,
    });
  }
};
