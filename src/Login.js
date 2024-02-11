import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

// Import your images
import meloMixLogo from './meloMixLogo.png';
import loginImage from './loginImage.png';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log('Form data:', formData);
      const response = await axios.post('http://localhost:8000/api/login', formData);
      console.log('Login response:', response.data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/user-type-selection');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        console.log('Error response:', error.response);
        if (error.response.status === 401) {
          // Unauthorized: incorrect username or password
          alert('Incorrect username or password. Please try again.');
        } else {
          // Other server errors
          alert(`An error occurred during login: ${error.response.data.message}. Please try again later.`);
        }
      } else {
        // Network error or other unexpected errors
        alert(`An unexpected error occurred during login: ${error.message}. Please try again later.`);
      }
    }
  };

  const handleSignUpClick = () => {
    navigate('/user-type-selection');
  };

  return (
    <Container style={{ backgroundColor: 'rgb(128, 1, 5)', minHeight: '100vh' }}>
    <Row className="justify-content-center">
      <Col xs={12} md={6} className="bg-light p-5 rounded">
        <Image src={meloMixLogo} alt="MeloMix Logo" fluid style={{ maxWidth: '3%', maxHeight: '3%', marginTop: '15px', marginLeft: '20px' }} />
        <h1 className="text-center mt-4" style={{ color: 'white', fontSize: '24px', marginTop: '-42px', marginLeft: '65px', fontFamily: 'Arial, sans-serif' }}>MeloMix</h1>
        <Form onSubmit={handleSubmit} className="mt-4">
          <p style={{ color: 'white', marginBottom: '40px', marginTop: '120px', marginLeft: '170px', fontSize:'30px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>LOG IN</p>
          
          <Form.Group controlId="formBasicUsername">
          <Form.Label style={{ color: 'white', marginLeft: '170px', fontFamily: 'Arial, sans-serif', fontSize:'20px' }}>Username:</Form.Label>
          <Form.Control type="username" name="username" onChange={handleChange} style={{ backgroundColor: 'white', border: 'none', width: '335px', height: '40px', marginLeft:'7px', borderRadius: '5px'  }} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" style={{ marginTop: '20px'}}>
          <Form.Label style={{ color: 'white', marginLeft: '170px', fontFamily: 'Arial, sans-serif', fontSize:'20px' }}>Password:</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} style={{ backgroundColor: 'white', border: 'none', width: '335px', height: '40px', marginLeft:'7px',  borderRadius: '5px'  }} />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100" style={{ color: 'white', height: '25px', marginBottom: '30px', width: '197px', marginRight: '35px', marginLeft: '170px', marginTop: '25px', backgroundColor: 'rgb(201, 58, 42)', border: 'none', borderRadius: '5px' }}>
  LOGIN
</Button>

<Button onClick={handleSignUpClick} className="btn btn-outline-primary w-100" style={{ color: 'white', height: '25px', marginBottom: '30px', width: '197px', marginRight: '35px', marginLeft: '10px',marginTop: '25px', backgroundColor: 'rgb(201, 58, 42)', border: 'none', borderRadius: '5px' }}>
  SIGN UP
</Button>


       </Form>
      </Col>
      <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
  <Image src={loginImage} alt="Login Image" fluid style={{ maxWidth: '30%', maxHeight: '30%', marginLeft:'55%', marginTop:'-27%', borderRadius:'5px'}} />
</Col>

    </Row>
  </Container>
  );
};

export default Login;
