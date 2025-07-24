import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  type: String
});

const dateRangeSchema = new mongoose.Schema({
  start: Date,
  end: Date
}, { _id: false });

const priestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  religion: { type: String, required: true },
  languages: [String],
  experience: Number,
  rating: Number,
  phone: String,
  email: String,
  addressLine: String,
  city: String,
  profileImage: {
    url: String,
    public_id: String,
  },
  documents: [documentSchema],
  availableDateRanges: [dateRangeSchema],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, { timestamps: true });

export const Priest = mongoose.model('Priest', priestSchema);
