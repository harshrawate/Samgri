// models/ritualModel.js
import mongoose from "mongoose";

const ritualSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    religion: {
      type: String,
      required: true,
    },
    festivals: [String],
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
    },
    category: String,
    image: {
      public_id: String,
      url: String,
    },
    seo: {
      metaTitle: String,
      keywords: String,
      metaDescription: String,
    },
    popularity: {
      type: String,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export const Ritual = mongoose.model("Ritual", ritualSchema);
