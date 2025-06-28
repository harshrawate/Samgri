import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: String,
  mobile: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zipCode: String,
  type: {
    type: String,
    enum: ['Home', 'Work', 'Other'],
    default: 'Home',
  },
  isDefault: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);
export default Address;
