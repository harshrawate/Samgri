import express from "express";
import {
  sendOtp,
  verifyOtpAndRegister,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/send-otp
router.post("/send-otp", sendOtp);

// @route   POST /api/auth/verify-otp
router.post("/verify-otp", verifyOtpAndRegister);

// @route   POST /api/auth/login
router.post("/login", loginUser);

export default router;
