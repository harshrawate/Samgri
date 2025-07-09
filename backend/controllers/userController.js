// controllers/userController.js
import { User } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err); // Log error
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};
