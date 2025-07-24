

import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ritualRoutes from "./routes/ritualRoutes.js";
import priestRoutes from "./routes/priestRoutes.js"

// Load environment variables from .env file
dotenv.config();


// Connect to MongoDB
connectDB()

// Initialize Express app
const app = express();
app.use(cookieParser());

// Middleware
app.use(cors({
  origin: "http://localhost:5173",  // frontend origin
  credentials: true,   
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],            // allow cookies
}));
app.use(express.json()) // Parses incoming JSON requests

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Samgri Backend API')
});

app.use("/api/auth", authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/addresses', addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rituals", ritualRoutes);
app.use("/api/priests", priestRoutes);



// Example route setup (uncomment when routes are ready)
// import priestRoutes from './routes/priestRoutes.js'
// app.use('/api/priests', priestRoutes)

// Error Handling Middleware (optional)
// import { notFound, errorHandler } from './middleware/errorHandler.js'
// app.use(notFound)
// app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
