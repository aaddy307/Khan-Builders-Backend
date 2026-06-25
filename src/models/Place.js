import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Place name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

placeSchema.index({ name: 'text' });

export default mongoose.model('Place', placeSchema);
