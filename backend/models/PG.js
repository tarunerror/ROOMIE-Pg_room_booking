import mongoose from 'mongoose';

const pgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  amenities: [String],
  images: [String],
  likes: { type: Number, default: 0 },
  trending: { type: Boolean, default: false },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'any'], required: true },
  rating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

export default mongoose.model('PG', pgSchema);