import express from 'express';
import { createProduct , getProducts , deleteProduct,updateProduct ,getProductById } from '../controllers/productController.js';
import Product from '../models/productModel.js';
import { uploadImages, uploadVideos } from '../utils/cloudinary.js';
import multer from 'multer';

// Combine both storages
const storage = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    uploadImages.storage._handleFile(req, file, cb);
  } else if (file.mimetype.startsWith('video/')) {
    uploadVideos.storage._handleFile(req, file, cb);
  } else {
    cb(new Error('Unsupported file type'), null);
  }
};

const upload = multer({ storage: { _handleFile: storage, _removeFile: () => {} } });

const multiUpload = upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]);

const router = express.Router();

router.post('/addProducts', multiUpload, createProduct);

router.get('/getProducts', getProducts);

router.delete('/:id', deleteProduct);

router.put('/:id', multiUpload, updateProduct);

router.get('/:id', getProductById);

export default router;