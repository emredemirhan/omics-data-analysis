const Gene = require('../models/Gene');
const { calculateStatistics, detectOutliersIQR, calculateTTest } = require('../utils/statisticsUtils');
const { formatTranscript } = require('../utils/formatUtils');

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
    transcript: formatTranscript(gene.transcript),
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
    transcript: formatTranscript(gene.transcript),
    outliers: mappedOutliers
  };
}; 