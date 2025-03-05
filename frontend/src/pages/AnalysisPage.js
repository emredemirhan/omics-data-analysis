import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { geneApi, analysisApi } from '../services/api';

import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import GeneInfoCard from '../components/GeneInfoCard';
import ExpressionChart from '../components/ExpressionChart';
import HeatmapChart from '../components/HeatmapChart';
import StatisticsCard from '../components/StatisticsCard';
import ExpressionDataTable from '../components/ExpressionDataTable';

const AnalysisPage = () => {
  const { geneId } = useParams();
  const [gene, setGene] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [outliers, setOutliers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch gene data using the API service
        const geneResponse = await geneApi.queryGenes([geneId]);
        
        if (geneResponse.data.data.length === 0) {
          setError(`Gene with ID ${geneId} not found.`);
          setLoading(false);
          return;
        }
        
        setGene(geneResponse.data.data[0]);
        
        // Fetch analysis data using the API service
        const analysisResponse = await analysisApi.getGeneAnalysis(geneId);
        setAnalysis(analysisResponse.data.data);
        
        // Fetch outlier data using the API service
        const outlierResponse = await analysisApi.detectOutliers(geneId);
        setOutliers(outlierResponse.data.data);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch gene analysis data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [geneId]);

  if (loading) {
    return <LoadingSpinner message="Loading gene analysis data..." />;
  }

  if (error) {
    return <ErrorAlert message={error} backLink="/query" backText="Back to Gene Query" />;
  }

  if (!gene || !analysis) {
    return <ErrorAlert message="No data available for this gene." backLink="/query" backText="Back to Gene Query" />;
  }

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gene Analysis: {gene.geneId}</h1>
        <Button as={Link} to="/query" variant="outline-primary">
          Back to Query
        </Button>
      </div>
      
      <Row className="mb-4">
        <Col>
          <GeneInfoCard gene={gene} analysis={analysis} />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <ExpressionChart gene={gene} />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <HeatmapChart gene={gene} />
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <StatisticsCard title="Experimental Group Statistics" stats={analysis.experimental} />
        </Col>
        
        <Col md={6}>
          <StatisticsCard title="Control Group Statistics" stats={analysis.control} />
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col>
          <ExpressionDataTable gene={gene} outliers={outliers} />
        </Col>
      </Row>
    </Container>
  );
};

export default AnalysisPage; 