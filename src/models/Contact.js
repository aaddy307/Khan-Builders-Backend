import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    phone: {
      type: [String],
      default: [],
    },
    email: {
      type: [String],
      default: [],
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    mapLink: {
      type: String,
      trim: true,
      default: '',
    },
    businessHours: [
      {
        day: { type: String },
        hours: { type: String },
      },
    ],
    socialLinks: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
      linkedin: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Contact', contactSchema);
