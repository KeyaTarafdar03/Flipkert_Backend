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
      },
      image: String,
      isOutOfStock: { type: Boolean, default: false },
    },
  ],
  sizeCategory: [
    {
      size: {
        type: String,
      },
      isOutOfStock: { type: Boolean, default: false },
    },
  ],
  isOutOfStock: { type: Boolean, default: false },
});

productSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;

    if (Array.isArray(ret.sizeCategory)) {
      if (ret.sizeCategory.length === 0) {
        delete ret.sizeCategory;
      } else {
        ret.sizeCategory = ret.sizeCategory.map((item) => {
          const { _id, ...rest } = item;
          return rest;
        });
      }
    }

    if (Array.isArray(ret.colorCategory)) {
      if (ret.colorCategory.length === 0) {
        delete ret.colorCategory;
      } else {
        ret.colorCategory = ret.colorCategory.map((item) => {
          const { _id, ...rest } = item;
          return rest;
        });
      }
    }

    return ret;
  },
});

export default mongoose.model("Product", productSchema);
