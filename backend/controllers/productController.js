import Product from '../models/productModel.js';
import { cloudinary } from '../utils/cloudinary.js';

export const createProduct = async (req, res) => {
  try {
    const {
      title, description, category, religion, price,
      discount, stock, status, tags, shipping, seo
    } = req.body;

    const media = [];

    if (req.files?.images) {
      for (const file of req.files.images) {
        media.push({ url: file.path, public_id: file.filename, type: 'image' });
      }
    }

    if (req.files?.videos) {
      for (const file of req.files.videos) {
        media.push({ url: file.path, public_id: file.filename, type: 'video' });
      }
    }

    const product = new Product({
      title,
      description,
      category,
      religion,
      price,
      discount,
      stock,
      status,
      tags: tags?.split(',').map(t => t.trim()),
      shipping,
      seo,
      media
    });

    await product.save();

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Delete all media from Cloudinary
    for (const media of product.media) {
      if (media.public_id) {
        await cloudinary.uploader.destroy(media.public_id, {
          resource_type: media.type === 'video' ? 'video' : 'image'
        });
      }
    }

    await product.deleteOne();

    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
