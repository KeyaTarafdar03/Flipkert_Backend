import express from "express";
import { addProduct, createCategory } from "../controller/adminController";
import { upload } from "../helper/multer";
import { asyncHandler } from "../helper/helper";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin");
});

router.post("/create-category", upload.single("image"), createCategory);
// router.post("/create-product", upload.single("image"), addProduct);
router.post(
  "/create-product",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "colorImages", maxCount: 10 },
  ]),
  asyncHandler(addProduct)
);


export default router;
