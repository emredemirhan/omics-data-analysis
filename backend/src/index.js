require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./utils/dbUtils');
const geneRoutes = require('./routes/geneRoutes');
const analysisRoutes = require('./routes/analysisRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration to allow requests from any origin
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/genes', geneRoutes);
app.use('/api/analysis', analysisRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Omics Data Analysis API is running');
});

// Start server
connectDB()
  .then((connected) => {
    if (connected) {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } else {
      process.exit(1);
    }
  });

module.exports = app; 