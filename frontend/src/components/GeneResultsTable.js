import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GeneResultsTable = ({ queryResults, handleRemoveGene, selectedGenes, handleClearAllGenes }) => {
  if (!queryResults || queryResults.length === 0) return null;
    
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Expression Data Results</h3>
        <div className="d-flex align-items-center gap-3">
          <Badge bg="primary" className="py-2 px-3">
            {selectedGenes.length} {selectedGenes.length === 1 ? 'Gene' : 'Genes'} Selected
          </Badge>
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={handleClearAllGenes}
            disabled={selectedGenes.length === 0}
          >
            Clear All
          </Button>
        </div>
      </div>
      
      <div className="table-responsive">
        <Table striped bordered hover className="gene-table">
          <thead>
            <tr>
              <th>Gene ID</th>
              <th style={{ minWidth: '200px' }}>Transcript</th>
              <th>Exper Rep1</th>
              <th>Exper Rep2</th>
              <th>Exper Rep3</th>
              <th>Control Rep1</th>
              <th>Control Rep2</th>
              <th>Control Rep3</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queryResults.map(gene => (
              <tr key={gene.geneId}>
                <td>{gene.geneId}</td>
                <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {gene.transcript}
                </td>
                <td>{gene.expressionValues.exper_rep1.toFixed(2)}</td>
                <td>{gene.expressionValues.exper_rep2.toFixed(2)}</td>
                <td>{gene.expressionValues.exper_rep3.toFixed(2)}</td>
                <td>{gene.expressionValues.control_rep1.toFixed(2)}</td>
                <td>{gene.expressionValues.control_rep2.toFixed(2)}</td>
                <td>{gene.expressionValues.control_rep3.toFixed(2)}</td>
                <td>
                  <div className="d-flex flex-column gap-2">
                    <Button 
                      as={Link} 
                      to={`/analysis/${gene.geneId}`} 
                      variant="info" 
                      size="sm"
                    >
                      Analyze
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemoveGene(gene.geneId)}
                    >
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default GeneResultsTable; 