/**
 * Check if a value is an outlier in the outliers array
 * @param {string} condition - The condition to check
 * @param {Object} outliers - The outliers object containing outliers array
 * @returns {boolean} - True if the condition is an outlier
 */
export const isOutlier = (condition, outliers) => {
  if (!outliers || !outliers.outliers) return false;
  return outliers.outliers.some(o => o.condition === condition);
}; 