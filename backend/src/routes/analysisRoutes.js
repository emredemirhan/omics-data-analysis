const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

// Get statistical analysis for a gene
router.get('/gene/:geneId', analysisController.getGeneAnalysis);

// Detect outliers in expression data
router.get('/outliers/gene/:geneId', analysisController.detectOutliers);

module.exports = router; 