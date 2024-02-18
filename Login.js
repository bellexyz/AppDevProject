import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      navigate('/try');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response) {
        console.log('Error response:', error.response); 
        if (error.response.status === 401) {
          // Unauthorized: incorrect email or password
          alert('Incorrect email or password. Please try again.');
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
    navigate('/try');
  };

  return (
    <div>
<<<<<<< HEAD
      <form onSubmit={handleSubmit}>
      
      <button onClick={handleSignUpClick}>Sign Up</button>
=======
      <div>
        <img src={meloMixLogo} alt="MeloMix Logo" />
        <p>MeloMix</p>
        <h1>LOG IN</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={handleSignUpClick}>Sign Up</button>
      </div>
      <div>
        <img src={loginImage} alt="Login Image" />
      </div>
>>>>>>> f67adddb35ec29c8d406bce53da8aa207a212d51
    </div>
  );
};

export default Login;
