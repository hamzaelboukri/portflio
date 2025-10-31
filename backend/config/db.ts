import mongoose from 'mongoose';  

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://mongo:27017/portfolio';
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
