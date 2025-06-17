// server.js

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js";

// Load environment variables from .env file
dotenv.config()

// Connect to MongoDB
connectDB()

// Initialize Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json()) // Parses incoming JSON requests

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the Samgri Backend API')
});

app.use("/api/auth", authRoutes);


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
