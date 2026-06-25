import mongoose from 'mongoose';
import Place from './Place.js';

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Property name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    type: {
      type: String,
      required: [true, 'Property type is required'],
      enum: ['Residential', 'Commercial', 'Villas', 'Plots'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Ongoing', 'Completed'],
    },
    config: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: String,
      trim: true,
      default: '',
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: [true, 'Location is required'],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

propertySchema.index({ name: 'text', location: 'text' });

propertySchema.pre('save', async function (next) {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  if (this.place) {
    try {
      const pl = await Place.findById(this.place);
      if (pl) {
        this.location = pl.name;
      }
    } catch (err) {
      return next(err);
    }
  }
  next();
});

export default mongoose.model('Property', propertySchema);
