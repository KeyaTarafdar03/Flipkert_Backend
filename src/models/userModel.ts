import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  address: String,
  otp: Number,
  cart: [
    {
      count: {
        type: Number,
        default: 0,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      color: String,
      size: String,
    },
  ],
  wishlist: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      color: String,
    },
  ],
  order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

userSchema.set("toJSON", {
  transform: function (doc: any, ret: any) {
    delete ret.__v;

    if (Array.isArray(ret.cart)) {
      ret.cart = ret.cart.map((item: { [x: string]: any; _id: any }) => {
        const { _id, ...rest } = item;
        return rest;
      });
    }
    return ret;
  },
});

export default mongoose.model("User", userSchema);
