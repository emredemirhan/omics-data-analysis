import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Gene API calls
export const geneApi = {
  // Get all genes with pagination
  getAllGenes: (page = 1, limit = 50) => {
    return api.get(`/genes?page=${page}&limit=${limit}`);
  },
  
  // Search genes by term
  searchGenes: (term, limit = 20) => {
    return api.get(`/genes/search?term=${term}&limit=${limit}`);
  },
  
  // Query genes by IDs
  queryGenes: (geneIds) => {
    return api.post('/genes/query', { geneIds });
  },

  // Get a single gene by ID
  getGeneById: (geneId) => {
    return api.get(`/genes/${geneId}`);
  }
};

// Analysis API calls
export const analysisApi = {
  // Get statistical analysis for a gene
  getGeneAnalysis: (geneId) => {
    return api.get(`/analysis/gene/${geneId}`);
  },
  
  // Detect outliers in gene expression data
  detectOutliers: (geneId) => {
    return api.get(`/analysis/outliers/gene/${geneId}`);
  }
};

const apiServices = {
  geneApi,
  analysisApi
};

export default apiServices;