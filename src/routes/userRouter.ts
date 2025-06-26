import express from "express";
import {
  addToCart,
  fetchUser,
  getAllCategory,
  getAllProducts,
  OTPSending,
  removeFromCart,
  resendOTP,
  verifyOTP,
} from "../controller/userController";
import isLoggedIn from "../middlewares/isLoggedIn";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User");
});

router.post("/otp-send", OTPSending);
router.post("/resend-otp", resendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/fetch-user", isLoggedIn, fetchUser);

router.get("/fetch-all-categories", getAllCategory);
router.get("/fetch-all-products", getAllProducts);

router.post("/add-to-cart", isLoggedIn, addToCart);
router.post("/remove-from-cart", isLoggedIn, removeFromCart);

export default router;
