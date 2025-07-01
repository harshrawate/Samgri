import express from "express";
import { addToCart,getCart,removeFromCart,updateCartItemQuantity,clearCart } from "../controllers/cartController.js";
import { isAuthenticated,isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/add", isAuthenticated, addToCart);

router.get('/', isAuthenticated, getCart);

router.put("/:productId", isAuthenticated, updateCartItemQuantity);

router.delete("/", isAuthenticated, clearCart);


router.delete('/:productId', isAuthenticated, removeFromCart);



export default router;
