import express from "express";
import { OTPSending, resendOTP, verifyOTP } from "../controller/userController";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User");
});

router.post("/otp-send", OTPSending);
router.post("/resend-otp", resendOTP);
router.post("/verify-otp", verifyOTP);

export default router;
