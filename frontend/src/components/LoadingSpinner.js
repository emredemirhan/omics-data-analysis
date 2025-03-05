import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Container className="text-center py-5">
      <Spinner animation="border" />
      <p className="mt-3">{message}</p>
    </Container>
  );
};

export default LoadingSpinner; 