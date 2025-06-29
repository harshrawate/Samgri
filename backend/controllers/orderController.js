import Order from "../models/orderModel.js";
import { razorpayInstance } from "../config/razorpay.js";
import crypto from "crypto";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, address, paymentMethod, pricing, coupon } = req.body;

    const newOrder = new Order({
      user: userId,
      items,
      address,
      paymentMethod,
      pricing,
      coupon
    });

    if (paymentMethod === "razorpay") {
      const options = {
        amount: pricing.total * 100, // convert to paise
        currency: "INR",
        receipt: "receipt_order_" + Date.now(),
      };

      const order = await razorpayInstance.orders.create(options);
      newOrder.razorpayOrderId = order.id;
      await newOrder.save();

      return res.status(201).json({
        message: "Order created",
        razorpayOrderId: order.id,
        orderId: newOrder._id,
      });
    } else {
      await newOrder.save();
      res.status(201).json({ message: "COD Order placed", orderId: newOrder._id });
    }
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Something went wrong while placing the order" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { orderId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const order = await Order.findByIdAndUpdate(orderId, {
        status: "paid",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      }, { new: true });

      return res.status(200).json({ message: "Payment verified", order });
    } else {
      return res.status(400).json({ message: "Invalid signature. Payment verification failed." });
    }
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ message: "Error verifying payment" });
  }
};
