const geneService = require('../services/geneService');

// Get all available genes with pagination
exports.getAllGenes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    
    const result = await geneService.getAllGenes(page, limit);
    
    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Query expression data for specified genes
exports.queryGenes = async (req, res) => {
  try {
    const { geneIds } = req.body;
    
    if (!geneIds || !Array.isArray(geneIds) || geneIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an array of gene IDs'
      });
    }

    const genes = await geneService.getGenesByIds(geneIds);
    
    if (genes.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No genes found with the provided IDs'
      });
    }

    res.status(200).json({
      success: true,
      count: genes.length,
      data: genes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Search genes by partial ID or transcript
exports.searchGenes = async (req, res) => {
  try {
    const { term } = req.query;
    
    if (!term || term.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Please provide a search term'
      });
    }
    
    const limit = parseInt(req.query.limit) || 20;
    const genes = await geneService.searchGenes(term, limit);
    
    res.status(200).json({
      success: true,
      count: genes.length,
      data: genes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
}; 