import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

export const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const order = new Order({
      user: req.user.id,
      items: cart.items,
      totalAmount,
    });
    await order.save();
    await Cart.findOneAndDelete({ user: req.user.id });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "items.product"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
