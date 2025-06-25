import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  highlights: String,
  category: String,
  image: String,
  colorCategory: [
    {
      color: {
        type: String,
        enum: ["red", "yellow", "green", "blue", "white"],
      },
      image: String,
      isOutOfStock: { type: Boolean, default: false },
    },
  ],
  sizeCategory: [
    {
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL", "4", "5", "6", "7", "8", "9"],
      },
      isOutOfStock: { type: Boolean, default: false },
    },
  ],
  isOutOfStock: { type: Boolean, default: false },
});

export default mongoose.model("Product", productSchema);
