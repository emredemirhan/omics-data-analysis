const express = require('express');
const router = express.Router();
const geneController = require('../controllers/geneController');

// Get all available genes
router.get('/', geneController.getAllGenes);

// Search genes by partial ID or transcript
router.get('/search', geneController.searchGenes);

// Query expression data for specified genes
router.post('/query', geneController.queryGenes);

module.exports = router; 