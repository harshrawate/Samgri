import express from 'express';
import {upload } from '../utils/cloudinary.js';
import { createPriest,getAllPriests } from '../controllers/priestController.js';

const router = express.Router();

// Allow profileImage (1 file) + documents (multiple)
router.post('/add', upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'documents', maxCount: 10 },
]), createPriest);

router.get('/getpriest', getAllPriests);

export default router;
