 // backend/modules/payments/payments.controller.js

// ✅ COD Payment
export const codPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // TODO: update order in DB
    // Example: await Order.findByIdAndUpdate(orderId, { paymentMethod: "COD", paymentStatus: "Pending" });

    return res.status(200).json({
      success: true,
      message: "Order placed with Cash on Delivery",
      orderId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "COD Payment Failed",
    });
  }
};

// ⚠️ Stripe placeholder
export const stripePayment = async (req, res) => {
  return res.status(200).json({
    success: false,
    message: "Stripe payment not implemented yet. You can integrate it later.",
  });
};