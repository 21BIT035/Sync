const { OrderMain } = require('../models/dbB');

exports.createOrder = async (req, res) => {
  try {
    const order = await OrderMain.create(req.body);
    res.status(201).json({ message: 'Order created', data: order });
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};
