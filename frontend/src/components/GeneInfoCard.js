import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';

const GeneInfoCard = ({ gene, analysis }) => {
  if (!gene || !analysis) return null;
  
  return (
    <Card>
      <Card.Header>Gene Information</Card.Header>
      <Card.Body>
        <Table bordered>
          <tbody>
            <tr>
              <th>Gene ID</th>
              <td>{gene.geneId}</td>
            </tr>
            <tr>
              <th>Transcript</th>
              <td>{gene.transcript}</td>
            </tr>
            <tr>
              <th>Fold Change</th>
              <td>
                {analysis.comparison.foldChange !== null 
                  ? analysis.comparison.foldChange.toFixed(2)
                  : 'N/A'}
              </td>
            </tr>
            <tr>
              <th>Log2 Fold Change</th>
              <td>
                {analysis.comparison.log2FoldChange !== null 
                  ? analysis.comparison.log2FoldChange.toFixed(2)
                  : 'N/A'}
              </td>
            </tr>
            <tr>
              <th>P-value</th>
              <td>
                {analysis.comparison.pValue !== undefined 
                  ? analysis.comparison.pValue.toFixed(4)
                  : 'N/A'}
                {analysis.comparison.significant && (
                  <Badge bg="success" className="ms-2">Significant</Badge>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default GeneInfoCard; 