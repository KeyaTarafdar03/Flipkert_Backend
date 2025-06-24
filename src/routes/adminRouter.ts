import express from "express";
import { createCategory } from "../controller/adminController";
import { upload } from "../helper/multer";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin");
});

router.post("/create-category", upload.single("image"), createCategory);

export default router;
