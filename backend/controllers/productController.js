import Product from '../models/productModel.js';
import { cloudinary } from '../utils/cloudinary.js';
import mongoose from 'mongoose';



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



export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Remove images/videos if requested
    const removedImages = req.body.removedImages ? JSON.parse(req.body.removedImages) : [];
    const removedVideos = req.body.removedVideos ? JSON.parse(req.body.removedVideos) : [];

    // Remove images from Cloudinary and product.media
    for (const public_id of removedImages) {
      await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
      product.media = product.media.filter(m => m.public_id !== public_id);
    }
    // Remove videos from Cloudinary and product.media
    for (const public_id of removedVideos) {
      await cloudinary.uploader.destroy(public_id, { resource_type: 'video' });
      product.media = product.media.filter(m => m.public_id !== public_id);
    }

    // Update fields
    product.title = req.body.title;
    product.description = req.body.description;
    product.category = req.body.category;
    product.religion = req.body.religion;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.stock = req.body.stock;
    product.status = req.body.status;
    product.tags = req.body.tags?.split(',').map(t => t.trim());
    product.shipping = req.body.shipping;
    product.seo = req.body.seo;

    // Handle new images/videos (append)
    if (req.files?.images) {
      for (const file of req.files.images) {
        product.media.push({ url: file.path, public_id: file.filename, type: 'image' });
      }
    }
    if (req.files?.videos) {
      for (const file of req.files.videos) {
        product.media.push({ url: file.path, public_id: file.filename, type: 'video' });
      }
    }

    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
    const { category, religion, exclude } = req.query;

   

    if (!category || !religion) {
      console.log("Missing category or religion");
      return res.status(400).json({ error: "Category and religion are required" });
    }

    const query = {
      category,
      religion,
      status: "Active" // optional if you want only active products
    };

    if (exclude) {
      const isValid = mongoose.Types.ObjectId.isValid(exclude);
      
      if (isValid) {
        query._id = { $ne: new mongoose.Types.ObjectId(exclude) };
      }
    }

    

    const related = await Product.find(query).limit(8);
    

    res.json(related);
  } catch (err) {
    console.error("Error in getRelatedProducts:", err); // This should show if anything fails
    res.status(500).json({ error: "Failed to fetch product" });
  }
};