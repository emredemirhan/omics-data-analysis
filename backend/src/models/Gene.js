const mongoose = require('mongoose');

const GeneSchema = new mongoose.Schema({
  geneId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  transcript: {
    type: String,
    required: true
  },
  expressionValues: {
    exper_rep1: {
      type: Number,
      default: 0
    },
    exper_rep2: {
      type: Number,
      default: 0
    },
    exper_rep3: {
      type: Number,
      default: 0
    },
    control_rep1: {
      type: Number,
      default: 0
    },
    control_rep2: {
      type: Number,
      default: 0
    },
    control_rep3: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Add index for faster queries
GeneSchema.index({ geneId: 1 });

module.exports = mongoose.model('Gene', GeneSchema); 