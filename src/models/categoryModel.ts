import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  image: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

categorySchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Category", categorySchema);
