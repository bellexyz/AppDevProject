import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const LandingPage = () => {
  const navigate = useNavigate(); // Move the useNavigate hook inside the component
  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#800000', minHeight: '100vh', position: 'relative' }}>
      <Container className="py-5">
        <Row>
          <Col>
            <h1 className="text-center text-white mb-4">Welcome to MeloMix!</h1>
            <p className="text-center text-white">
              "Harmonize Your World: MeloMix - Where Music Meets Your Soul"
            </p>
          </Col>
        </Row>
      </Container>
      <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
        <Button variant="danger" style={{ width:'100px' }} size="sm" onClick={handleSignOut}>Sign Out</Button>
      </div>
    </div>
  );
}

export default LandingPage;
