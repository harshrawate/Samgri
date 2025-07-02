import express from "express";
import { placeOrder, verifyPayment,getUserOrders,getAllOrders} from "../controllers/orderController.js";
import { isAuthenticated,isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, placeOrder);
router.post("/verify-payment", isAuthenticated, verifyPayment);

router.get("/my-orders", isAuthenticated, getUserOrders);

router.get("/admin/all-orders", isAuthenticated, isAdmin, getAllOrders);

export default router;
