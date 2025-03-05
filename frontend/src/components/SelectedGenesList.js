import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

// Component-specific styles
const componentStyles = {
  geneListContainer: {
    maxHeight: '200px',
    overflowY: 'auto'
  }
};

const SelectedGenesList = ({ 
  selectedGenes, 
  handleRemoveGene, 
  handleQueryGenes, 
  loading 
}) => {
  return (
    <>
      <h5>Selected Genes</h5>
      {selectedGenes.length === 0 ? (
        <p className="text-muted">No genes selected</p>
      ) : (
        <div className="p-2 border rounded" style={componentStyles.geneListContainer}>
          {selectedGenes.map(gene => (
            <div 
              key={gene.geneId} 
              className="p-2 border-bottom d-flex justify-content-between align-items-center"
            >
              <span>{gene.geneId} ({gene.transcript})</span>
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => handleRemoveGene(gene.geneId)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <Button 
        variant="primary" 
        className="mt-3"
        onClick={handleQueryGenes}
        disabled={selectedGenes.length === 0 || loading}
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Querying...
          </>
        ) : (
          'Query Expression Data'
        )}
      </Button>
    </>
  );
};

export default SelectedGenesList; 