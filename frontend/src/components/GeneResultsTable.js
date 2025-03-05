import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GeneResultsTable = ({ queryResults, handleRemoveGene, selectedGenes, handleClearAllGenes }) => {
  if (!queryResults || queryResults.length === 0) return null;
    
  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
        <h3 className="mb-2 mb-md-0">Expression Data Results</h3>
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
              <th className="d-none d-lg-table-cell" style={{ minWidth: '200px' }}>Transcript</th>
              <th className="d-none d-lg-table-cell">Exper Rep1</th>
              <th className="d-none d-lg-table-cell">Exper Rep2</th>
              <th className="d-none d-lg-table-cell">Exper Rep3</th>
              <th className="d-none d-lg-table-cell">Control Rep1</th>
              <th className="d-none d-lg-table-cell">Control Rep2</th>
              <th className="d-none d-lg-table-cell">Control Rep3</th>
              <th className="d-none d-lg-table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queryResults.map(gene => (
              <tr key={gene.geneId}>
                <td className="d-lg-none">
                  <div><strong>ID:</strong> {gene.geneId}</div>
                  <div><strong>Transcript:</strong> {gene.transcript}</div>
                  <div className="mt-2">
                    <Button as={Link} to={`/analysis/${gene.geneId}`} variant="info" size="sm">Analyze</Button>
                    <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleRemoveGene(gene.geneId)}>Remove</Button>
                  </div>
                </td>
                <td className="d-none d-lg-table-cell">{gene.geneId}</td>
                <td className="d-none d-lg-table-cell" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{gene.transcript}</td>
                <td className="d-none d-lg-table-cell">{gene.expressionValues.exper_rep1.toFixed(2)}</td>
                <td className="d-none d-lg-table-cell">{gene.expressionValues.exper_rep2.toFixed(2)}</td>
                <td className="d-none d-lg-table-cell">{gene.expressionValues.exper_rep3.toFixed(2)}</td>
                <td className="d-none d-lg-table-cell">{gene.expressionValues.control_rep1.toFixed(2)}</td>
                <td className="d-none d-lg-table-cell">{gene.expressionValues.control_rep2.toFixed(2)}</td>
                <td className="d-none d-lg-table-cell">{gene.expressionValues.control_rep3.toFixed(2)}</td>
                <td className="d-none d-lg-table-cell">
                  <div className="d-flex flex-column gap-2">
                    <Button as={Link} to={`/analysis/${gene.geneId}`} variant="info" size="sm">Analyze</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleRemoveGene(gene.geneId)}>Remove</Button>
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