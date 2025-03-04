const Gene = require('../models/Gene');

/**
 * Get statistical analysis for a gene
 * @param {string} geneId - Gene ID
 * @returns {Promise<Object>} - Analysis results
 */
exports.getGeneAnalysis = async (geneId) => {
  const gene = await Gene.findOne({ geneId });
  
  if (!gene) {
    throw new Error('Gene not found');
  }

  // Extract expression values
  const experimentalValues = [
    gene.expressionValues.exper_rep1,
    gene.expressionValues.exper_rep2,
    gene.expressionValues.exper_rep3
  ];
  
  const controlValues = [
    gene.expressionValues.control_rep1,
    gene.expressionValues.control_rep2,
    gene.expressionValues.control_rep3
  ];

  // Calculate statistics
  const experimentalStats = calculateStatistics(experimentalValues);
  const controlStats = calculateStatistics(controlValues);
  
  // Calculate fold change
  const foldChange = experimentalStats.mean !== 0 && controlStats.mean !== 0 
    ? experimentalStats.mean / controlStats.mean 
    : null;
  
  // Calculate log2 fold change
  const log2FoldChange = foldChange ? Math.log2(foldChange) : null;

  // Calculate p-value using t-test
  const pValue = calculateTTest(experimentalValues, controlValues);

  return {
    geneId: gene.geneId,
    transcript: gene.transcript,
    experimental: experimentalStats,
    control: controlStats,
    comparison: {
      foldChange,
      log2FoldChange,
      pValue,
      significant: pValue < 0.05
    }
  };
};

/**
 * Detect outliers in gene expression data
 * @param {string} geneId - Gene ID
 * @returns {Promise<Object>} - Outlier detection results
 */
exports.detectOutliers = async (geneId) => {
  const gene = await Gene.findOne({ geneId });
  
  if (!gene) {
    throw new Error('Gene not found');
  }

  // Extract all expression values
  const allValues = [
    gene.expressionValues.exper_rep1,
    gene.expressionValues.exper_rep2,
    gene.expressionValues.exper_rep3,
    gene.expressionValues.control_rep1,
    gene.expressionValues.control_rep2,
    gene.expressionValues.control_rep3
  ];

  // Detect outliers using IQR method
  const outliers = detectOutliersIQR(allValues);
  
  // Map outliers to their respective conditions and replicates
  const mappedOutliers = outliers.map(index => {
    const conditions = [
      'exper_rep1', 'exper_rep2', 'exper_rep3',
      'control_rep1', 'control_rep2', 'control_rep3'
    ];
    
    return {
      condition: conditions[index],
      value: allValues[index]
    };
  });

  return {
    geneId: gene.geneId,
    transcript: gene.transcript,
    outliers: mappedOutliers
  };
};

/**
 * Calculate basic statistics for an array of values
 * @param {Array<number>} values - Array of numeric values
 * @returns {Object} - Statistical measures
 */
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

/**
 * Detect outliers using the IQR method
 * @param {Array<number>} values - Array of numeric values
 * @returns {Array<number>} - Indices of outliers
 */
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

/**
 * Calculate p-value using Welch's t-test
 * @param {Array<number>} group1 - First group of values
 * @param {Array<number>} group2 - Second group of values
 * @returns {number} - p-value
 */
function calculateTTest(group1, group2) {
  // Calculate means
  const mean1 = group1.reduce((sum, val) => sum + val, 0) / group1.length;
  const mean2 = group2.reduce((sum, val) => sum + val, 0) / group2.length;
  
  // Calculate variances
  const variance1 = group1.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) / (group1.length - 1);
  const variance2 = group2.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0) / (group2.length - 1);
  
  // Calculate t-statistic
  const t = Math.abs(mean1 - mean2) / Math.sqrt((variance1 / group1.length) + (variance2 / group2.length));
  
  // Calculate degrees of freedom (Welch-Satterthwaite equation)
  const df = Math.pow((variance1 / group1.length) + (variance2 / group2.length), 2) / 
    (Math.pow(variance1 / group1.length, 2) / (group1.length - 1) + 
     Math.pow(variance2 / group2.length, 2) / (group2.length - 1));
  
  // Simplified p-value calculation (approximation)
  // In a real application, you would use a more accurate t-distribution function
  const pValue = 2 * (1 - Math.min(1, 1 / (1 + Math.pow(t, 2) / df)));
  
  return pValue;
} 