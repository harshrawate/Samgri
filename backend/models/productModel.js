import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  type: { type: String, enum: ['image', 'video'] }
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  religion: String,
  price: Number,
  discount: Number,
  stock: Number,
  status: { type: String, enum: ['Active', 'Inactive', 'Draft'], default: 'Active' },
  tags: [String],
  shipping: String,
  seo: String,
  media: [mediaSchema], // images/videos
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
