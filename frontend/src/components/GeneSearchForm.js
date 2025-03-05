import React, { useRef, useEffect } from 'react';
import { Form, Spinner, Button, InputGroup } from 'react-bootstrap';

// Component-specific styles defined as JavaScript objects
const componentStyles = {
  formContainer: {
    position: 'relative',
  },
  resultsContainer: {
    position: 'absolute',
    top: 69,
    zIndex: 1000,
    width: '100%',
    maxHeight: '250px',
    overflowY: 'auto',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '0.25rem',
    marginTop: '5px'
  },
  resultRow: {
    cursor: 'pointer',
    transition: 'backgroundColor 0.2s',
    padding: '8px 12px'
  },
  resultRowHover: {
    backgroundColor: '#f0f0f0'
  },
  geneId: {
    fontWeight: '500',
    marginRight: '8px'
  },
  transcripts: {
    fontSize: '0.85em',
    color: '#666',
    display: 'block',
    marginTop: '2px'
  },
  addButton: {
    color: '#007bff',
    fontSize: '0.9em',
    whiteSpace: 'nowrap'
  },
  dropdownHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    borderBottom: '1px solid #dee2e6',
    backgroundColor: '#f8f9fa'
  },
  closeButton: {
    cursor: 'pointer',
    color: '#6c757d',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    lineHeight: 1
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
  // State to control dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  // Add state to track if a search has been performed
  const [hasSearched, setHasSearched] = React.useState(false);
  // Ref for the form container to detect clicks outside
  const formRef = useRef(null);

  // Show dropdown when there are search results
  useEffect(() => {
    if (searchResults.length > 0) {
      setIsDropdownOpen(true);
    }
    // Mark that a search has been performed when we get results or finish loading
    if (!searchLoading) {
      setHasSearched(true);
    }
  }, [searchResults, searchLoading]);

  // Reset hasSearched when search term changes
  useEffect(() => {
    setHasSearched(false);
  }, [searchTerm]);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear search input
  const handleClearSearch = () => {
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  return (
    <div ref={formRef} style={componentStyles.formContainer}>
      <Form.Group>
        <Form.Label>Search for genes</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter gene ID or transcript"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              if (searchResults.length > 0) {
                setIsDropdownOpen(true);
              }
            }}
            style={{ outline: 'none', boxShadow: 'none' }}
          />
          {searchTerm && (
            <Button variant="outline-secondary" onClick={handleClearSearch}>
              ×
            </Button>
          )}
        </InputGroup>
        <Form.Text className="text-muted">
          Type to search for genes by ID or transcript
        </Form.Text>
      </Form.Group>
      
      {searchLoading && <Spinner animation="border" size="sm" />}
      
      {!searchLoading && hasSearched && searchTerm && searchResults.length === 0 && (
        <div className="border rounded" style={componentStyles.resultsContainer}>
          <div style={componentStyles.dropdownHeader}>
            <span>No results found</span>
          </div>
        </div>
      )}
      
      {isDropdownOpen && searchResults.length > 0 && (
        <div className="border rounded" style={componentStyles.resultsContainer}>
          <div style={componentStyles.dropdownHeader}>
            <span>{searchResults.length} results found</span>
            <span 
              style={componentStyles.closeButton} 
              onClick={() => setIsDropdownOpen(false)}
            >
              ×
            </span>
          </div>
          {searchResults.map(gene => (
            <div 
              key={gene.geneId} 
              className="border-bottom"
              style={{
                ...componentStyles.resultRow,
                ...(hoveredRow === gene.geneId ? componentStyles.resultRowHover : {})
              }}
              onClick={() => handleAddGene(gene)}
              onMouseEnter={() => setHoveredRow(gene.geneId)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div style={{ textAlign: 'left' }}>
                  <span style={componentStyles.geneId}>{gene.geneId}</span>
                  <span style={componentStyles.transcripts}>{gene.transcript}</span>
                </div>
                <span style={componentStyles.addButton}>Click to add</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneSearchForm; 