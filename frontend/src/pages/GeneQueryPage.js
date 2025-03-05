import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { geneApi } from '../services/api';

// Import components
import GeneSearchForm from '../components/GeneSearchForm';
import GeneResultsTable from '../components/GeneResultsTable';
import ErrorAlert from '../components/ErrorAlert';

// Local storage keys
const SELECTED_GENES_STORAGE_KEY = 'omicsDataAnalysis_selectedGenes';
const QUERY_RESULTS_STORAGE_KEY = 'omicsDataAnalysis_queryResults';

const GeneQueryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // Initialize selectedGenes from localStorage if available
  const [selectedGenes, setSelectedGenes] = useState(() => {
    const savedGenes = localStorage.getItem(SELECTED_GENES_STORAGE_KEY);
    return savedGenes ? JSON.parse(savedGenes) : [];
  });
  // Initialize queryResults from localStorage if available
  const [queryResults, setQueryResults] = useState(() => {
    const savedResults = localStorage.getItem(QUERY_RESULTS_STORAGE_KEY);
    return savedResults ? JSON.parse(savedResults) : [];
  });
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save selectedGenes to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(SELECTED_GENES_STORAGE_KEY, JSON.stringify(selectedGenes));
  }, [selectedGenes]);

  // Save queryResults to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(QUERY_RESULTS_STORAGE_KEY, JSON.stringify(queryResults));
  }, [queryResults]);

  // Search for genes as user types
  useEffect(() => {
    const searchGenes = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      setSearchLoading(true);
      try {
        const response = await geneApi.searchGenes(searchTerm);
        setSearchResults(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error searching genes:', err);
        setError('Failed to search genes. Please try again.');
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    };

    const timeoutId = setTimeout(searchGenes, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle adding a gene to the selected list
  const handleAddGene = (gene) => {
    if (!selectedGenes.some(g => g.geneId === gene.geneId)) {
      const updatedGenes = [...selectedGenes, gene];
      setSelectedGenes(updatedGenes);
      
      // Automatically query genes when a new gene is added
      queryGenesData(updatedGenes);
    }
    // Don't clear the search term to allow multiple selections
    // setSearchTerm('');
  };

  // Handle removing a gene from the selected list
  const handleRemoveGene = (geneId) => {
    const updatedGenes = selectedGenes.filter(gene => gene.geneId !== geneId);
    setSelectedGenes(updatedGenes);
    
    // Update query results when a gene is removed
    setQueryResults(queryResults.filter(result => result.geneId !== geneId));
    
    // If there are still genes selected, query the new set
    if (updatedGenes.length > 0) {
      queryGenesData(updatedGenes);
    }
  };

  // Handle clearing all selected genes
  const handleClearAllGenes = () => {
    setSelectedGenes([]);
    setQueryResults([]);
  };

  // Extracted function to query genes data
  const queryGenesData = async (genes) => {
    if (genes.length === 0) {
      setError('Please select at least one gene to query.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await geneApi.queryGenes(
        genes.map(gene => gene.geneId)
      );
      
      setQueryResults(response.data.data);
    } catch (err) {
      console.error('Error querying genes:', err);
      setError('Failed to query gene expression data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Gene Expression Query</h1>
      
      {error && <ErrorAlert message={error} />}
      
      <Row className="mb-4">
        <Col md={12}>
          <GeneSearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchResults={searchResults}
            searchLoading={searchLoading}
            handleAddGene={handleAddGene}
          />
        </Col>
      </Row>
      
      {loading && (
        <div className="text-center mb-4">
          <Spinner animation="border" />
          <p className="mt-2">Querying gene expression data...</p>
        </div>
      )}
      
      <GeneResultsTable 
        queryResults={queryResults} 
        handleRemoveGene={handleRemoveGene}
        selectedGenes={selectedGenes}
        handleClearAllGenes={handleClearAllGenes}
      />
    </Container>
  );
};

export default GeneQueryPage;