import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="text-center py-5">
            <h1>Omics Data Retrieval and Analysis System</h1>
            <p className="lead">
              A comprehensive platform for retrieving, analyzing, and visualizing gene expression data
            </p>
            <Button as={Link} to="/query" variant="primary" size="lg" className="mt-3">
              Start Gene Query
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Data Retrieval</Card.Title>
              <Card.Text>
                Query and retrieve gene expression data for specific genes from our comprehensive database.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Statistical Analysis</Card.Title>
              <Card.Text>
                Perform statistical analysis on gene expression across samples, including mean, median, and variance.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Visualization</Card.Title>
              <Card.Text>
                Visualize expression data through interactive charts and detect anomalies in gene expression patterns.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage; 