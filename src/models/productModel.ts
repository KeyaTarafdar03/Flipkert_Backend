import mongoose from "mongoose";

enum color {
  red,
  yellow,
  green,
  blue,
  white,
}

enum size {
  XS,
  S,
  M,
  L,
  XL,
  XXL,
  four = 4,
  five = 5,
  six = 6,
  seven = 7,
  eight = 8,
  nine = 9,
}

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  colorCategory: [
    {
      color: color,
      isOutOfStock: { type: Boolean, default: false },
      image: {
        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        },
      },
    },
  ],
  sizeCategory: [
    {
      size: size,
      isOutOfStock: { type: Boolean, default: false },
    },
  ],
  isOutOfStock: { type: Boolean, default: false },
});

export default mongoose.model("Product", productSchema);
