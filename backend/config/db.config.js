// connectDB.js
import mongoose from 'mongoose';

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  try {
    if (!MONGO_URI) {
      throw new Error('❌ MONGO_URI is undefined! Please check your .env file.');
    }

    mongoose.set('strictQuery', true); // Avoid deprecation warning

    await mongoose.connect(MONGO_URI);

    console.log('✅ MongoDB Atlas Connected...');
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
