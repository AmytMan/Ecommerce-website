import mongoose from 'mongoose';
const connectToDatabase = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};
 
export default connectToDatabase;
