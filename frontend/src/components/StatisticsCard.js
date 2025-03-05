import React from 'react';
import { Card, Table } from 'react-bootstrap';

const StatisticsCard = ({ title, stats }) => {
  if (!stats) return null;
  
  return (
    <Card className="analysis-card">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Table bordered>
          <tbody>
            <tr>
              <th>Mean</th>
              <td>{stats.mean.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Median</th>
              <td>{stats.median.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Standard Deviation</th>
              <td>{stats.stdDev.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Min</th>
              <td>{stats.min.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Max</th>
              <td>{stats.max.toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default StatisticsCard; 