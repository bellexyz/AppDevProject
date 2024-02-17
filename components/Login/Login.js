import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image, Stack } from 'react-bootstrap';
import axios from 'axios';

// Import your images
import meloMixLogo from '../../images/meloMixLogo.png';
import loginImage from '../../images/loginImage.png';
import { toast } from 'react-toastify';

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
      navigate('/LandingPage');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        console.log('Error response:', error.response);
        if (error.response.status === 401) {
          // Unauthorized: incorrect username or password
          toast.error("Incorrect username or password. Please try again.");
        } else {
          // Other server errors
          toast.error(`An error occurred during login: ${error.response.data.message}. Please try again later.`);
        }
      } else {
        // Network error or other unexpected errors
        toast.error(`An unexpected error occurred during login: ${error.message}. Please try again later.`);
      }
    }
  };

  const handleSignUpClick = () => {
    navigate('/user-type-selection');
  };

  return (
    <Container fluid className='font' style={{ backgroundColor: '#800000', minHeight: '100vh', padding:'0px', margin: '0px', position:'relative'}}>
    <Container className="d-flex flex-row align-items-center justify-content-start p-3 m-0" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Image src={meloMixLogo} alt="MeloMix Logo" style={{ height: '35px', marginRight: '10px' }}/>
      <h1 style={{ color: 'white', fontSize: '20px', fontWeight:'600', margin: 0 }}>MeloMix</h1>
    </Container>
    <Row className="justify-content-start m-5">
      <Col xs={12} md={6} className='ml-10 align-items- mt-5' >
        <Form  onSubmit={handleSubmit} className="mt-5 justify-content-between" style={{margin: '70px'}}>
        <Stack gap={4}>
          <h2 className="text-left text-white mb-4" style={{fontSize:'50px', fontWeight: '600'}}>LOG IN</h2>
          
          <Form.Group controlId="formBasicUsername" className='d-flex flex-row align-items-center justify-content-between'>
            <Form.Label className="text-white" style={{fontSize:'20px'}}>Username:</Form.Label>
            <Form.Control type="username" name="username" onChange={handleChange} style={{ backgroundColor: 'white', border: 'none', width: '75%', marginLeft: '2px', borderRadius: '5px' }} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className='d-flex flex-row align-items-center justify-content-between'>
            <Form.Label className="text-white" style={{fontSize:'20px'}}>Password:</Form.Label>
            <Form.Control type="password" name="password" onChange={handleChange} style={{ backgroundColor: 'white', border: 'none', width: '75%', marginLeft: '2px', borderRadius: '5px' }} />
          </Form.Group>
          <div className=" gap-5 d-flex flex-row align-items-center">
          <Button variant="primary" type="submit" className="w-100 " style={{ backgroundColor: 'rgb(201, 58, 42)', border: 'none', borderRadius: '5px' }}>
            LOGIN
          </Button>
          <Button onClick={handleSignUpClick} className="btn w-100" style={{ backgroundColor: 'rgb(201, 58, 42)', border: 'none', borderRadius: '5px' }}>
            SIGN UP
          </Button>
          </div>
          </Stack>
        </Form>
      </Col>
      <Col xs={12} md={6} className="d-none d-md-block position-relative">
        <Image src={loginImage} alt="Login Image" className="position-absolute " style={{height:'500px', borderRadius:'5px', marginLeft:'100px'}}/>
      </Col>
    </Row>
  </Container>
  
  
  );
};

export default Login;