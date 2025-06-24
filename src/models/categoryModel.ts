import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  image: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

export default mongoose.model("Category", categorySchema);
