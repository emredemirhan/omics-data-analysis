require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const geneRoutes = require('./routes/geneRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/genes', geneRoutes);
app.use('/api/analysis', analysisRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Omics Data Analysis API is running');
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/omics');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app; 