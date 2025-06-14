const { sales_order, sales_order_item } = require('../models/zaapko_prod');

exports.getOrdersWithItems = async (req, res) => {
  try {
    const orders = await sales_order.findAll({
      include: {
        model: sales_order_item,
        required: true 
      }
    });

  return res.status(200).json({
      success: true,
      message: 'Orders with at least one item retrieved.',
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders with items:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch data.',
      error: error.message
    });
  }
};
