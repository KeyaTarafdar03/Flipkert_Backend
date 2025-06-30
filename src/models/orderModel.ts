import mongoose from "mongoose";

export enum orderStatus {
  placed = "Placed",
  shipped = "shipped",
  outOfDelivery = "outOfDelivery",
  delivered = "delivered",
  cancled = "cancled",
}

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      count: {
        type: Number,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      color: String,
      size: String,
    },
  ],
  paymentId: String,
  totalAmount: Number,
  orderStatus: {
    type: String,
    enum: Object.values(orderStatus),
    default: orderStatus.placed,
  },
  createdAt: { type: Date },
  deliveredAt: { type: Date },
  cancledAt: { type: Date },
});

export default mongoose.model("Order", orderSchema);
