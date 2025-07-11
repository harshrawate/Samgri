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

export const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

export const updateUserProfile = async (req, res) => {
  const userId = req.user._id;

  const updates = {
    name: req.body.fullName,
    phone: req.body.phone,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    religion: req.body.religion,
    language: req.body.language,
  };

  // If a profile image was uploaded, set the URL
  if (req.file) {
    updates.profileImage = req.file.path; // Cloudinary URL
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
