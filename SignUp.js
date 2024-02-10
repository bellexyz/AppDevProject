import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SignUp = () => {
  const { userType } = useParams();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/api/register/${userType}`, formData);
      setMessage('Registration successful!');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        console.log(validationErrors);
      } else {
        setMessage('Registration failed. Please try again.');
        console.error('Registration failed:', error);
      }
    } finally {
      setIsLoading(false);
      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      });
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input type="password" name="password_confirmation" placeholder="Confirm Password" value={formData.password_confirmation} onChange={handleChange} />
        <button type="submit" disabled={isLoading}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
