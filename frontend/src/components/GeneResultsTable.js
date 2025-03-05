import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GeneResultsTable = ({ queryResults }) => {
  if (!queryResults || queryResults.length === 0) return null;
  
  return (
    <>
      <h3 className="mb-3">Expression Data Results</h3>
      <div className="table-responsive">
        <Table striped bordered hover className="gene-table">
          <thead>
            <tr>
              <th>Gene ID</th>
              <th>Transcript</th>
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
                <td>{gene.transcript}</td>
                <td>{gene.expressionValues.exper_rep1.toFixed(2)}</td>
                <td>{gene.expressionValues.exper_rep2.toFixed(2)}</td>
                <td>{gene.expressionValues.exper_rep3.toFixed(2)}</td>
                <td>{gene.expressionValues.control_rep1.toFixed(2)}</td>
                <td>{gene.expressionValues.control_rep2.toFixed(2)}</td>
                <td>{gene.expressionValues.control_rep3.toFixed(2)}</td>
                <td>
                  <Button 
                    as={Link} 
                    to={`/analysis/${gene.geneId}`} 
                    variant="info" 
                    size="sm"
                  >
                    Analyze
                  </Button>
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