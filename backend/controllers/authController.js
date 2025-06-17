import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateToken } from "../utils/jwtHelper.js";
import bcrypt from "bcryptjs";

const otpStore = new Map(); // TEMP in-memory OTP store

// STEP 1: Send OTP
export const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  // ✅ Don't hash the password here
  otpStore.set(email, {
    name,
    email,
    password, // plain password
    otp,
    createdAt: Date.now(),
  });

  await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}`);
  res.status(200).json({ message: "OTP sent to your email." });
};


// STEP 2: Verify OTP and Register User
export const verifyOtpAndRegister = async (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore.get(email);
  if (!record) {
    return res.status(400).json({ message: "No OTP found. Please request again." });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // OPTIONAL: Check if OTP expired (10 mins)
  const now = Date.now();
  const otpAge = now - record.createdAt;
  if (otpAge > 10 * 60 * 1000) {
    otpStore.delete(email);
    return res.status(410).json({ message: "OTP expired. Please try again." });
  }

  const user = await User.create({
    name: record.name,
    email: record.email,
    password: record.password,
  });

  const token = generateToken(user._id);
  otpStore.delete(email);

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

// STEP 3: Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  

  const token = generateToken(user._id);
  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
