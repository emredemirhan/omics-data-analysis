import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';

const ExpressionDataTable = ({ gene, outliers }) => {
  if (!gene) return null;
  
  // Check if a value is an outlier
  const isOutlier = (condition) => {
    if (!outliers || !outliers.outliers) return false;
    return outliers.outliers.some(o => o.condition === condition);
  };
  
  return (
    <Card>
      <Card.Header>Expression Data</Card.Header>
      <Card.Body>
        <Table bordered>
          <thead>
            <tr>
              <th>Condition</th>
              <th>Rep 1</th>
              <th>Rep 2</th>
              <th>Rep 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Experimental</th>
              <td className={isOutlier('exper_rep1') ? 'outlier' : ''}>
                {gene.expressionValues.exper_rep1.toFixed(2)}
                {isOutlier('exper_rep1') && <Badge bg="danger" className="ms-2">Outlier</Badge>}
              </td>
              <td className={isOutlier('exper_rep2') ? 'outlier' : ''}>
                {gene.expressionValues.exper_rep2.toFixed(2)}
                {isOutlier('exper_rep2') && <Badge bg="danger" className="ms-2">Outlier</Badge>}
              </td>
              <td className={isOutlier('exper_rep3') ? 'outlier' : ''}>
                {gene.expressionValues.exper_rep3.toFixed(2)}
                {isOutlier('exper_rep3') && <Badge bg="danger" className="ms-2">Outlier</Badge>}
              </td>
            </tr>
            <tr>
              <th>Control</th>
              <td className={isOutlier('control_rep1') ? 'outlier' : ''}>
                {gene.expressionValues.control_rep1.toFixed(2)}
                {isOutlier('control_rep1') && <Badge bg="danger" className="ms-2">Outlier</Badge>}
              </td>
              <td className={isOutlier('control_rep2') ? 'outlier' : ''}>
                {gene.expressionValues.control_rep2.toFixed(2)}
                {isOutlier('control_rep2') && <Badge bg="danger" className="ms-2">Outlier</Badge>}
              </td>
              <td className={isOutlier('control_rep3') ? 'outlier' : ''}>
                {gene.expressionValues.control_rep3.toFixed(2)}
                {isOutlier('control_rep3') && <Badge bg="danger" className="ms-2">Outlier</Badge>}
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ExpressionDataTable; 