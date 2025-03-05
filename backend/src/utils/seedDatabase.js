require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Gene = require('../models/Gene');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/omics');
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

// Parse TSV file and seed database
const seedDatabase = async () => {
  // Path to the TSV file
  const tsvFilePath = path.resolve(__dirname, '../../../simple_demo.tsv');
  
  if (!fs.existsSync(tsvFilePath)) {
    console.error(`TSV file not found at ${tsvFilePath}`);
    process.exit(1);
  }

  console.log('Starting database seeding...');
  console.log(`Reading data from ${tsvFilePath}`);

  // Clear existing data
  try {
    await Gene.deleteMany({});
    console.log('Cleared existing gene data');
  } catch (error) {
    console.error('Error clearing existing data:', error);
    process.exit(1);
  }

  // Counter for progress tracking
  let count = 0;
  const batchSize = 100;
  let batch = [];

  // Create a read stream and parse the TSV file
  fs.createReadStream(tsvFilePath)
    .pipe(csv({ separator: '\t' }))
    .on('data', (row) => {
      // Create a gene document from the row
      const gene = {
        geneId: row.gene,
        transcript: row.transcript,
        expressionValues: {
          exper_rep1: parseFloat(row.exper_rep1) || 0,
          exper_rep2: parseFloat(row.exper_rep2) || 0,
          exper_rep3: parseFloat(row.exper_rep3) || 0,
          control_rep1: parseFloat(row.control_rep1) || 0,
          control_rep2: parseFloat(row.control_rep2) || 0,
          control_rep3: parseFloat(row.control_rep3) || 0
        }
      };

      // Add to batch
      batch.push(gene);
      count++;

      // Insert batch when it reaches the batch size
      if (batch.length >= batchSize) {
        insertBatch([...batch]);
        batch = [];
        console.log(`Processed ${count} genes`);
      }
    })
    .on('end', async () => {
      // Insert any remaining genes
      if (batch.length > 0) {
        await insertBatch(batch);
        console.log(`Processed ${count} genes`);
      }
      
      console.log('Database seeding completed successfully');
      console.log(`Total genes imported: ${count}`);
      
      // Close the database connection
      mongoose.connection.close();
      process.exit(0);
    })
    .on('error', (error) => {
      console.error('Error parsing TSV file:', error);
      mongoose.connection.close();
      process.exit(1);
    });
};

// Helper function to insert a batch of genes
const insertBatch = async (genes) => {
  try {
    await Gene.insertMany(genes, { ordered: false });
  } catch (error) {
    console.error('Error inserting batch:', error);
  }
};

// Run the seeding process
connectDB().then((connected) => {
  if (connected) {
    seedDatabase();
  } else {
    console.error('Failed to connect to the database. Seeding aborted.');
    process.exit(1);
  }
}); 