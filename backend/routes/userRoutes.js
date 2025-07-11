import express from "express";
import { getAllUsers,updateUserByAdmin,updateUserProfile } from "../controllers/userController.js";
import { isAuthenticated,isAdmin } from "../middleware/isAuthenticated.js";
import { uploadProfileImage } from '../utils/cloudinary.js';

const router = express.Router();

router.put("/update-profile", isAuthenticated,uploadProfileImage.single('profileImage'), updateUserProfile);

router.put("/:id", updateUserByAdmin); // Add middleware later (isAdmin)

router.get("/", isAuthenticated, isAdmin, getAllUsers); // Admin only



export default router;
