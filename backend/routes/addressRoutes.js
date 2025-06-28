import express from 'express';
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/addressController.js';

import { isAuthenticated,isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get('/', isAuthenticated, getAddresses);
router.post('/', isAuthenticated, addAddress);
router.put('/:id', isAuthenticated, updateAddress);
router.delete('/:id', isAuthenticated, deleteAddress);

export default router;
