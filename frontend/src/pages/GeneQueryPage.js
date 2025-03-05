import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { geneApi } from '../services/api';

// Import components
import GeneSearchForm from '../components/GeneSearchForm';
import SelectedGenesList from '../components/SelectedGenesList';
import GeneResultsTable from '../components/GeneResultsTable';
import ErrorAlert from '../components/ErrorAlert';

const GeneQueryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenes, setSelectedGenes] = useState([]);
  const [queryResults, setQueryResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setSelectedGenes([...selectedGenes, gene]);
    }
    setSearchTerm('');
  };

  // Handle removing a gene from the selected list
  const handleRemoveGene = (geneId) => {
    setSelectedGenes(selectedGenes.filter(gene => gene.geneId !== geneId));
  };

  // Handle querying expression data for selected genes
  const handleQueryGenes = async () => {
    if (selectedGenes.length === 0) {
      setError('Please select at least one gene to query.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await geneApi.queryGenes(
        selectedGenes.map(gene => gene.geneId)
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
        <Col md={6}>
          <GeneSearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchResults={searchResults}
            searchLoading={searchLoading}
            handleAddGene={handleAddGene}
          />
        </Col>
        
        <Col md={6}>
          <SelectedGenesList
            selectedGenes={selectedGenes}
            handleRemoveGene={handleRemoveGene}
            handleQueryGenes={handleQueryGenes}
            loading={loading}
          />
        </Col>
      </Row>
      
      <GeneResultsTable queryResults={queryResults} />
    </Container>
  );
};

export default GeneQueryPage;