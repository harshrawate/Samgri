import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },

  phone: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  religion: { type: String },
  language: { type: String },
  profileImage: { type: String }, // base64 or URL

  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
}, { timestamps: true });

// ✅ Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", userSchema);
