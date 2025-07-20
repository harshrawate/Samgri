// routes/ritualRoutes.js
import express from "express";
import {
  createRitual,
  getAllRituals,updateRitual,deleteRitual,
} from "../controllers/ritualController.js";
import { isAuthenticated,isAdmin } from "../middleware/isAuthenticated.js";
import { uploadRitualImage } from "../utils/cloudinary.js";

const router = express.Router();

router.post(
  "/addRitual",
  isAuthenticated,
  isAdmin,
  uploadRitualImage.single("image"), // ✅ Use correct multer middleware
  createRitual
);

router.get("/", getAllRituals);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  uploadRitualImage.single("image"), // If image upload supported on update
  updateRitual
);

router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  deleteRitual
);

export default router;
