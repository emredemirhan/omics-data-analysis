import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Component-specific styles
const componentStyles = {
  chartContainer: {
    height: '300px'
  }
};

const ExpressionChart = ({ gene }) => {
  if (!gene) return null;
  
  const chartData = {
    labels: ['Rep 1', 'Rep 2', 'Rep 3'],
    datasets: [
      {
        label: 'Experimental',
        data: [
          gene.expressionValues.exper_rep1,
          gene.expressionValues.exper_rep2,
          gene.expressionValues.exper_rep3
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Control',
        data: [
          gene.expressionValues.control_rep1,
          gene.expressionValues.control_rep2,
          gene.expressionValues.control_rep3
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gene Expression Comparison'
      }
    }
  };

  return (
    <Card className="chart-container">
      <Card.Header>Expression Values</Card.Header>
      <Card.Body>
        <div style={componentStyles.chartContainer}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ExpressionChart; 