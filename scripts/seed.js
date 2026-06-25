import '../src/config/env.js';
import mongoose from 'mongoose';
import env from '../src/config/env.js';
import seedAdmin from '../db/seeds/001-admin.js';

const seed = async () => {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log('MongoDB connected for seeding');

    await seedAdmin();

    console.log('Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
