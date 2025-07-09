import express from "express";
import { getAllUsers,updateUserByAdmin } from "../controllers/userController.js";
import { isAuthenticated,isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, getAllUsers); // Admin only

router.put("/:id", updateUserByAdmin); // Add middleware later (isAdmin)

export default router;
