import Order from './order.model.js';

// ---------------- CREATE ORDER ----------------
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, contactNumber } = req.body;
    const user = req.user._id; // assuming JWT middleware sets req.user

    const newOrder = await Order.create({
      user,
      items,
      totalAmount,
      deliveryAddress,
      contactNumber,
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};

// ---------------- GET ALL ORDERS ----------------
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.menuItem', 'name price');
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
};

// ---------------- GET SINGLE ORDER ----------------
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.menuItem', 'name price');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch order', error: error.message });
  }
};

// ---------------- UPDATE ORDER STATUS ----------------
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update order', error: error.message });
  }
};

// ---------------- DELETE ORDER ----------------
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete order', error: error.message });
  }
};