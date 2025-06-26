import express from "express";
import { addProduct, createCategory } from "../controller/adminController";
import { upload } from "../helper/multer";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin");
});

router.post("/create-category", upload.single("image"), createCategory);
router.post("/create-product", upload.array("images"), addProduct);

export default router;
