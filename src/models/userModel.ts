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
    },
  ],
  order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
