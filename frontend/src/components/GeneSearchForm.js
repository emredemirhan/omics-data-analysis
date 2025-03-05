import React from 'react';
import { Form, Spinner } from 'react-bootstrap';

// Component-specific styles defined as JavaScript objects
const componentStyles = {
  resultsContainer: {
    maxHeight: '200px',
    overflowY: 'auto'
  },
  resultRow: {
    cursor: 'pointer',
    transition: 'backgroundColor 0.2s'
  },
  resultRowHover: {
    backgroundColor: '#f0f0f0'
  }
};

const GeneSearchForm = ({ 
  searchTerm, 
  setSearchTerm, 
  searchResults, 
  searchLoading, 
  handleAddGene 
}) => {
  // State to track which row is being hovered
  const [hoveredRow, setHoveredRow] = React.useState(null);

  return (
    <>
      <Form.Group>
        <Form.Label>Search for genes</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter gene ID or transcript"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Text className="text-muted">
          Type to search for genes by ID or transcript
        </Form.Text>
      </Form.Group>
      
      {searchLoading && <Spinner animation="border" size="sm" />}
      
      {searchResults.length > 0 && (
        <div className="mt-2 p-2 border rounded" style={componentStyles.resultsContainer}>
          {searchResults.map(gene => (
            <div 
              key={gene.geneId} 
              className="p-2 border-bottom d-flex justify-content-between align-items-center"
              style={{
                ...componentStyles.resultRow,
                ...(hoveredRow === gene.geneId ? componentStyles.resultRowHover : {})
              }}
              onClick={() => handleAddGene(gene)}
              onMouseEnter={() => setHoveredRow(gene.geneId)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <span>{gene.geneId} ({gene.transcript})</span>
              <span className="text-primary">Click to add</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GeneSearchForm; 