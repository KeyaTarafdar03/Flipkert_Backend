import express from "express";
import {
  addToCart,
  clearCart,
  fetchUser,
  getAllCategory,
  getAllProducts,
  OTPSending,
  placeOrderFromCart,
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
router.get("/clear-cart", isLoggedIn, clearCart);

router.get("/place-order-from-cart", isLoggedIn, placeOrderFromCart);

export default router;
