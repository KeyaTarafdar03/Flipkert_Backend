import express from "express";
import {
  addToCart,
  clearCart,
  fetchUser,
  getAllCategory,
  getAllProducts,
  OTPSending,
  placeOrderFromCart,
  placeOrderSingleItem,
  removeFromCart,
  resendOTP,
  updateUserDetails,
  verifyOTP,
  fetchSingleProduct,
  addToWishlist,
  removeFromWishlist,
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
router.post("/user-details-update", isLoggedIn, updateUserDetails);

router.get("/fetch-all-categories", getAllCategory);
router.get("/fetch-all-products", getAllProducts);
router.get("/fetch-single-product", fetchSingleProduct);

router.post("/add-to-cart", isLoggedIn, addToCart);
router.post("/remove-from-cart", isLoggedIn, removeFromCart);
router.get("/clear-cart", isLoggedIn, clearCart);
router.post("/add-to-wishlist", isLoggedIn, addToWishlist);
router.post("/remove-from-wishlist", isLoggedIn, removeFromWishlist);

router.get("/place-order-from-cart", isLoggedIn, placeOrderFromCart);
router.post("/place-single-order", isLoggedIn, placeOrderSingleItem);

export default router;
