import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const LandingPage = () => {
  const navigate = useNavigate(); // Move the useNavigate hook inside the component
  const [showResendButton, setShowResendButton] = useState(false); // State to toggle resend button


  const handleResendVerification = () => {
    axios.post('/resend-verification-email', { email: 'user@example.com' }) // Pass the user's email or fetch it from state
        .then(response => {
            alert(response.data.message); // Show success message
        })
        .catch(error => {
            alert(error.response.data.message); // Show error message
        });
};


  useEffect(() => {
    // Check user's verification status on component mount
    axios.post('/api/user/verification-status')
      .then(response => {
        setShowResendButton(!response.data.verified); // Show resend button if user is not verified
      })
      .catch(error => {
        console.error('Error fetching user verification status:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on mount

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
        {showResendButton && (
          <Button variant="primary" style={{ width: '150px', marginRight: '10px' }} size="sm" onClick={handleResendVerification}>
            Resend Verification
          </Button>
        )}
        <Button variant="danger" style={{ width: '100px' }} size="sm" onClick={handleSignOut}>Sign Out</Button>
      </div>
    </div>
  );
}

export default LandingPage;
