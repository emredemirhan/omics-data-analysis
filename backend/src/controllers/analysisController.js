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

// Helper function to calculate statistics
function calculateStatistics(values) {
  // Sort values for median calculation
  const sortedValues = [...values].sort((a, b) => a - b);
  
  // Calculate mean
  const sum = values.reduce((acc, val) => acc + val, 0);
  const mean = sum / values.length;
  
  // Calculate median
  const mid = Math.floor(sortedValues.length / 2);
  const median = sortedValues.length % 2 === 0
    ? (sortedValues[mid - 1] + sortedValues[mid]) / 2
    : sortedValues[mid];
  
  // Calculate variance
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / values.length;
  
  // Calculate standard deviation
  const stdDev = Math.sqrt(variance);
  
  return {
    mean,
    median,
    variance,
    stdDev,
    min: Math.min(...values),
    max: Math.max(...values)
  };
}

// Helper function to detect outliers using IQR method
function detectOutliersIQR(values) {
  // Sort values
  const sortedValues = [...values].sort((a, b) => a - b);
  
  // Calculate Q1 and Q3
  const q1Index = Math.floor(sortedValues.length * 0.25);
  const q3Index = Math.floor(sortedValues.length * 0.75);
  
  const q1 = sortedValues[q1Index];
  const q3 = sortedValues[q3Index];
  
  // Calculate IQR
  const iqr = q3 - q1;
  
  // Define outlier thresholds
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  // Find outliers
  const outlierIndices = [];
  values.forEach((value, index) => {
    if (value < lowerBound || value > upperBound) {
      outlierIndices.push(index);
    }
  });
  
  return outlierIndices;
} 