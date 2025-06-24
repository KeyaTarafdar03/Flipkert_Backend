import mongoose from "mongoose";

export enum orderStatus {
  placed,
  shipped,
  outOfDelivery,
  delivered,
  cancled,
}

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      _id: false,
      count: {
        type: Number,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      isCancled: {
        type: Boolean,
        default: false,
      },
    },
  ],
  paymentId: String,
  totalAmount: Number,
  orderStatus: {
    type: String,
    enum: Object.values(orderStatus),
    default: orderStatus.pending,
  },
  createdAt: { type: Date },
  deliveredAt: { type: Date },
  cancledAt: { type: Date },
  deliveryBoy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  otp: { type: Number, require: true },
});

// function autoPopulate(this: any, next: () => void) {
//   this.populate({
//     path: "userId products.product deliveryBoy",
//   });
//   next();
// }

// orderSchema.pre("find", autoPopulate);
// orderSchema.pre("findOne", autoPopulate);

export default mongoose.model("Order", orderSchema);
