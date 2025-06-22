import Product from '../models/productModel.js';

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
