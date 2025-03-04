const Gene = require('../models/Gene');

/**
 * Get all genes with pagination
 * @param {number} page - Page number
 * @param {number} limit - Number of items per page
 * @returns {Promise<Object>} - Paginated genes
 */
exports.getAllGenes = async (page = 1, limit = 50) => {
  const skip = (page - 1) * limit;
  
  const genes = await Gene.find({}, 'geneId transcript')
    .skip(skip)
    .limit(limit)
    .sort({ geneId: 1 });
  
  const total = await Gene.countDocuments();
  
  return {
    genes,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    totalGenes: total
  };
};

/**
 * Get genes by IDs
 * @param {Array<string>} geneIds - Array of gene IDs
 * @returns {Promise<Array>} - Array of genes
 */
exports.getGenesByIds = async (geneIds) => {
  return await Gene.find({ geneId: { $in: geneIds } });
};

/**
 * Search genes by partial ID or transcript
 * @param {string} searchTerm - Search term
 * @param {number} limit - Number of results to return
 * @returns {Promise<Array>} - Array of matching genes
 */
exports.searchGenes = async (searchTerm, limit = 20) => {
  const regex = new RegExp(searchTerm, 'i');
  
  return await Gene.find({
    $or: [
      { geneId: regex },
      { transcript: regex }
    ]
  }, 'geneId transcript')
    .limit(limit)
    .sort({ geneId: 1 });
}; 