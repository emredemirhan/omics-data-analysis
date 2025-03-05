const analysisService = require('../services/analysisService');

// Get statistical analysis for a gene
exports.getGeneAnalysis = async (req, res) => {
  try {
    const { geneId } = req.params;
    
    const analysis = await analysisService.getGeneAnalysis(geneId);
    
    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    if (error.message === 'Gene not found') {
      return res.status(404).json({
        success: false,
        error: 'Gene not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};

// Detect outliers in expression data
exports.detectOutliers = async (req, res) => {
  try {
    const { geneId } = req.params;
    
    const outlierResults = await analysisService.detectOutliers(geneId);
    
    res.status(200).json({
      success: true,
      data: outlierResults
    });
  } catch (error) {
    if (error.message === 'Gene not found') {
      return res.status(404).json({
        success: false,
        error: 'Gene not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
}; 