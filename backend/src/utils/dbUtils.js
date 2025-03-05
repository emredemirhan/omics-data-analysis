const mongoose = require('mongoose');

/**
 * Connect to MongoDB
 * @returns {Promise<boolean>} - True if connection successful, false otherwise
 */
exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/omics');
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

/**
 * Insert a batch of documents into the database
 * @param {Model} model - Mongoose model to insert into
 * @param {Array} documents - Array of documents to insert
 * @returns {Promise<void>}
 */
exports.insertBatch = async (model, documents) => {
  try {
    await model.insertMany(documents, { ordered: false });
  } catch (error) {
    console.error('Error inserting batch:', error);
  }
}; 