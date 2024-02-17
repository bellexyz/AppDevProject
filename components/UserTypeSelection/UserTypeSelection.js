import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Container, Form, Image, Stack } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import meloMixLogo from '../../images/meloMixLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserTypeSelection = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [isLoadingToast, setIsLoadingToast] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorToken, setShowErrorToken] = useState (false);
  const [showErrorArtist, setShowErrorArtist] = useState(false);

  const selectUserType = (userType) => {
    if (userType === 'artist') {
      showToastMessage1();
    } else {
      handleShowModal(); // Show modal when user selects a user type
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  const handleCancel = () => {
    navigate('/login');
    setShowModal(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!captchaToken) {
      showToastMessage3(true);
      return;
    }
    const requiredFields = ['first_name', 'last_name', 'username', 'email', 'password', 'password_confirmation', 'profile_picture'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    // Check if any required field is empty
      if (emptyFields.length > 0) {
        toast.error('Please enter field');
        
      }
      // Validate password format
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(formData.password)) {
        toast.error("Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.");
        
      }
    setIsLoading(true);
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      const response = await axios.post(`http://localhost:8000/api/register/listener`, data);
      showToastMessage4(true);
      navigate('/Login');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        console.log(validationErrors);
      } else {
        showToastMessage2(true);
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
      handleCloseModal(); // Close modal after submission
    }
  };

  const handleCaptchaChange = token => {
    setCaptchaToken(token);
  };
  
  const showToastMessage1 = () => {
    setIsLoadingToast(true); // Set loading to true when showing toast
    toast.error("Artists can't register yet!", {
    onClose: () => setIsLoadingToast(false)
    });
  };
  const showToastMessage2 = () => {
    toast.error("Registration failed. Please try again", {
    });
  };
  const showToastMessage3 = () => {
    toast.error("Please complete CAPTCHA", {
    });
  };
  const showToastMessage4 = () => {
    toast.success("Registration Successful!", {
    });
  };

  return ( 
    <Container className='font' fluid style={{ backgroundColor: '#800000', height: '100vh', width: '100vw', padding:'0px', }}>
      <Link to="/login" className="d-flex flex-row align-items-center justify-content-start p-3 m-0" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Image src={meloMixLogo} alt="MeloMix Logo" style={{ height: '35px', marginRight: '10px' }}/>
        <h1 style={{ color: 'white', fontSize: '20px', fontWeight:'600', margin: 0 }}>MeloMix</h1>
      </Link>
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
      <Container>
        <Stack gap={4} className='mx-auto text-center d-flex flex-column align-items-center'>
          <h5 style={{ color: 'white', fontSize:'30px', fontWeight:'700'}}>Sign Up as:</h5>
          <Button variant="danger" onClick={() => selectUserType('listener')} className="me-2" style={{ width: '20%',  }}>A Listener</Button>
          <Button variant="danger" onClick={() => selectUserType('artist')} className="me-2" style={{ width: '20%' }}>An Artist</Button>
        </Stack>
      </Container>
    </Container>


      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} aria-labelledby="contained-modal-title-vcenter" centered className="font" >
      <Modal.Body style={{ backgroundColor: '#2D2D2D', borderRadius: '5px'}}>
        <Container>
          {message && <p>{message}</p>}
          <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center font" style={{fontWeight:'600'}}>
          <div className="file-input-container mb-3" style={{ backgroundColor: '#fff' }}>
              <label htmlFor="profile_picture" className="upload-button">
                {formData.profile_picture ? (
                  <Image src={URL.createObjectURL(formData.profile_picture)} alt="Profile" className="profile-image" />
                ) : (
                  <span>Upload Image</span>
                )}
              </label>
              <Form.Control type="file" name="profile_picture" id="profile_picture" onChange={handleFileChange} />
            </div>
            <Stack gap={2} className='mb-4 mx-auto' style={{width: '90%'}}>
              <Form.Control type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} style={{textAlign:'left', fontWeight:'600', fontSize: '15px'}} />
              <Form.Control type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} style={{textAlign:'left', fontWeight:'600', fontSize: '15px'}} />
              <Form.Control type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} style={{textAlign:'left', fontWeight:'600', fontSize: '15px'}}/>
              <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{textAlign:'left', fontWeight:'600', fontSize: '15px'}}/>
              <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={{textAlign:'left', fontWeight:'600', fontSize: '15px'}}/>
              <Form.Control type="password" name="password_confirmation" placeholder="Confirm Password" value={formData.password_confirmation} onChange={handleChange} style={{textAlign:'left', fontWeight:'600', fontSize: '15px'}}/>
            </Stack>
            
            <ReCAPTCHA
              className='mb-4'
              sitekey="6Lf2m28pAAAAAP_3DFva3HARJ4PGDDrF2XpPaBpC"
              onChange={handleCaptchaChange}
            />
            <div className="d-grid gap-2 d-flex flex-column align-items-center mb-4 mt-1"  >
              <Button variant="danger"  style={{ minWidth: '300%' }} size="sm" type="submit" disabled={isLoading}>
                SIGN UP
              </Button>
              <Button variant="secondary"  style={{ minWidth: '300%' }}size="sm" onClick={handleCloseModal}>
                CANCEL
              </Button>
            </div>
            </Form>
        </Container>
      </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserTypeSelection;
