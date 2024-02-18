import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      <form onSubmit={handleSubmit}>
        <input type="username" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignUpClick}>Sign Up</button>
    </div>
  );
};

export default Login;
