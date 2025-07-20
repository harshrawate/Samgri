// controllers/ritualController.js
import { Ritual } from "../models/ritualModel.js";

export const createRitual = async (req, res) => {
  try {
    const {
      title,
      description,
      religion,
      festivals,
      price,
      duration,
      category,
    popularity,
      seo,
    } = req.body;

    let imageData = {};
    if (req.file) {
      imageData = {
        public_id: req.file.filename,
        url: req.file.path, // This is the Cloudinary URL
      };
    }

    const newRitual = new Ritual({
      title,
      description,
      religion,
      festivals: festivals?.split(",").map(f => f.trim()),
      price,
      duration,
      category,
      seo: {
        metaTitle: seo?.metaTitle || "",
        keywords: seo?.keywords || "",
        metaDescription: seo?.metaDescription || "",
      },
      popularity,
      image: imageData,
    });

    await newRitual.save();

    res.status(201).json({
      success: true,
      message: "Ritual created successfully",
      ritual: newRitual,
    });
  } catch (error) {
    console.error("Error creating ritual:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the ritual",
    });
  }
};


export const getAllRituals = async (req, res) => {
  try {
    const rituals = await Ritual.find({ status: "Active" }).sort({ popularity: -1 });
    res.status(200).json({
      success: true,
      rituals,
    });
  } catch (error) {
    console.error("Error fetching rituals:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching rituals",
    });
  }
};


// Update Ritual logic
export const updateRitual = async (req, res) => {
  try {
    const {
      title,
      description,
      religion,
      festivals,
      price,
      duration,
      category,
      popularity,
      seo,
    } = req.body;

    let updateFields = {
      title,
      description,
      religion,
      festivals: festivals?.split(",").map(f => f.trim()),
      price,
      duration,
      category,
      popularity,
      seo: {
        metaTitle: seo?.metaTitle || "",
        keywords: seo?.keywords || "",
        metaDescription: seo?.metaDescription || "",
      },
    };
    // Handle Image update
    if (req.file) {
      updateFields.image = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    const ritual = await Ritual.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!ritual) return res.status(404).json({ success: false, message: "Ritual not found" });

    res.json({ success: true, ritual });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error updating ritual" });
  }
};

// Delete Ritual logic
export const deleteRitual = async (req, res) => {
  try {
    const ritual = await Ritual.findByIdAndDelete(req.params.id);
    if (!ritual) return res.status(404).json({ success: false, message: "Ritual not found" });
    res.json({ success: true, message: "Ritual deleted successfully" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error deleting ritual" });
  }
};
