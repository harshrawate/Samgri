import express from "express";
import { placeOrder, verifyPayment } from "../controllers/orderController.js";
import { isAuthenticated,isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, placeOrder);
router.post("/verify-payment", isAuthenticated, verifyPayment);

export default router;
