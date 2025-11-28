import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dynamic_forms';
  await mongoose.connect(uri);
  console.log('MongoDB connected');
};

// const connectDB = async () => {
//   const uri = process.env.MONGO_URI || 'mongodb://mongo:27017/dynamic_forms';
//   let connected = false;
//   let retries = 5;

//   while (!connected && retries > 0) {
//     try {
//       await mongoose.connect(uri);
//       connected = true;
//       console.log('MongoDB connected');
//     } catch (err) {
//       retries--;
//       console.log(`MongoDB connection failed, retries left: ${retries}`);
//       await new Promise(res => setTimeout(res, 5000));
//     }
//   }

//   if (!connected) {
//     console.error('Failed to connect to MongoDB after multiple attempts');
//     process.exit(1);
//   }
// };

export default connectDB;

