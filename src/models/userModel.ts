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
  order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;

    if (Array.isArray(ret.cart)) {
      ret.cart = ret.cart.map((item) => {
        const { _id, ...rest } = item;
        return rest;
      });
    }
    return ret;
  },
});

export default mongoose.model("User", userSchema);
