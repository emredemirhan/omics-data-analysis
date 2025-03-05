import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ErrorAlert = ({ message, backLink, backText = 'Back' }) => {
  return (
    <Container className="py-5">
      <Alert variant="danger">{message}</Alert>
      {backLink && (
        <Button as={Link} to={backLink} variant="primary">
          {backText}
        </Button>
      )}
    </Container>
  );
};

export default ErrorAlert; 