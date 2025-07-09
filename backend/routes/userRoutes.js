import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { isAuthenticated,isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, getAllUsers); // Admin only

export default router;
