import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    }
  ],
  address: {
    fullName: String,
    mobile: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: String,
    type: String
  },
  paymentMethod: { type: String, enum: ["razorpay", "cod"], required: true },
  pricing: {
    subtotal: Number,
    tax: Number,
    shipping: Number,
    discount: Number,
    total: Number
  },
  coupon: {
    code: String,
    discount: Number
  },
  status: { type: String, default: "pending" },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
