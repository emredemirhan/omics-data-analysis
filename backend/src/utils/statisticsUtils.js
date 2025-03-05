/**
 * Calculate basic statistics for an array of values
 * @param {Array<number>} values - Array of numeric values
 * @returns {Object} - Statistical measures
 */
exports.calculateStatistics = (values) => {
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
};

/**
 * Detect outliers using the IQR method
 * @param {Array<number>} values - Array of numeric values
 * @returns {Array<number>} - Indices of outliers
 */
exports.detectOutliersIQR = (values) => {
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
};

/**
 * Calculate p-value using Welch's t-test
 * @param {Array<number>} group1 - First group of values
 * @param {Array<number>} group2 - Second group of values
 * @returns {number} - p-value
 */
exports.calculateTTest = (group1, group2) => {
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
}; 