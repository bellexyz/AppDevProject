import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import meloMixLogo from './meloMixLogo.png';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const { userType } = useParams();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_picture: null
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const handleCancel = () => {
    navigate('/login');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!captchaToken) {
      setMessage('Please complete the CAPTCHA.');
      return;
    }
  
    // Check if any required field is empty
    const requiredFields = ['first_name', 'last_name', 'username', 'email', 'password', 'password_confirmation', 'profile_picture'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
  
    if (emptyFields.length > 0) {
      setMessage(`Please enter ${emptyFields.join(', ')}.`);
      return;
    }
  
    // Validate password format
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(formData.password)) {
      setMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.');
      return;
    }
  
    setIsLoading(true);
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      const response = await axios.post(`http://localhost:8000/api/register/${userType}`, data);
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
        password_confirmation: '',
        profile_picture: null
      });
    }
  };
  
  
  const handleCaptchaChange = token => {
    setCaptchaToken(token);
  };

  return (
    <div>
      <img src={meloMixLogo} alt="MeloMix Logo" />
      <p>MeloMix</p>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input type="password" name="password_confirmation" placeholder="Confirm Password" value={formData.password_confirmation} onChange={handleChange} />
        <div className="file-input-container">
          <label htmlFor="profile_picture" className="upload-button">
            {formData.profile_picture ? (
              <img src={URL.createObjectURL(formData.profile_picture)} alt="Profile" className="profile-image" />
            ) : (
              <span>Upload Image</span>
            )}
          </label>
          <input type="file" name="profile_picture" id="profile_picture" onChange={handleFileChange} />
        </div>

        <ReCAPTCHA
          sitekey="6Lf4nm8pAAAAAEtDxAf_MJaiDIzMai5rWqcJj8Br"
          onChange={handleCaptchaChange}
        />
        <button type="submit" disabled={isLoading}>Sign Up</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default SignUp; 
