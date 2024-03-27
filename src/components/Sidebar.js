import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Image, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPodcast, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import profile from '../images/loginImage.png';
import Dashboard from './AdminDashboard'; // Import the Dashboard component

const Sidebar = () => {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/login');
  };

  const handleSideNavClick = (navItem) => {
    setActiveNavItem(navItem);
    if (navItem === 'dashboard') {
      navigate('/admin'); // Navigate to the '/admin' route for the Dashboard
    } else {
        navigate(`/admin/${navItem}`);
    }
  };

  return (
    <Col sm={2} className="bg-black sidebar mb-2 mt-4" style={{ minHeight: '87vh' }}>
      <Container className="d-flex justify-content-left align-items-center mt-3 p-0 m-0 mb-3" style={{ gap: '25px' }}>
        <Image src={profile} style={{ height: '65px', marginRight: '10px', marginLeft: '10px' }} />
        <h3 style={{ color: '#FFFFFF', fontSize: '20px' }}>Admin</h3>
      </Container>
      <div className="m-3" style={{ height: '1px', backgroundColor: 'white' }}> </div>
      <Container className="d-flex flex-column justify-content-between mt-3">
        <Nav className="flex-column" style={{ gap: '10px', marginBottom: '20px' }}>
          <Nav.Item>
            <Nav.Link
              href="#"
              style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'dashboard' ? 'bold' : 'normal' }}
              onClick={() => handleSideNavClick('dashboard')}>
              <FontAwesomeIcon icon={faChartBar} /> Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#"
              style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'user' ? 'bold' : 'normal' }}
              onClick={() => handleSideNavClick('user')}>
              <FontAwesomeIcon icon={faUser} /> User
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#"
              style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'subscription' ? 'bold' : 'normal' }}
              onClick={() => handleSideNavClick('subscription')}>
              <FontAwesomeIcon icon={faPodcast} /> Subscription
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Button variant="danger align-self-center" style={{ width: '200px', marginTop: '200px' }} size="sm" onClick={handleSignOut}>
          <FontAwesomeIcon icon={faSignOutAlt} /> LOG OUT
        </Button>
      </Container>
    </Col>
  );
}

export default Sidebar;