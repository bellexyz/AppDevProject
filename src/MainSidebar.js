import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Image, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPodcast, faChartBar, faSignOutAlt, faCircleChevronRight, faCircleChevronLeft, faHouseUser, faMagnifyingGlass, faFileLines } from '@fortawesome/free-solid-svg-icons';



const MainSidebar = () => {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/login');
  };

  const handleSideNavClick = (navItem) => {
    setActiveNavItem(navItem);
    if (navItem === 'dashboard') {
      navigate('/admin'); 
    } else {
      navigate('/admin');
    }
  };

  return (
    <Col sm={2} className="bg-black sidebar mb-2 mt-4" style={{ maxHeight: '87vh', maxWidth: '6.5%' }}>
      <Container className="d-flex flex-column justify-content-between" style={{ backgroundColor: 'black', minHeight: '83vh', padding: '15px' }}>
      <Container className="d-flex justify-content-between align-items-center mt-3 p-0 m-0 mb-3">
        <Button className="mt-3" style={{ background: 'none', border: 'none', marginRight: '0px' }}>
          <FontAwesomeIcon prefix="far" size='lg'/>
        </Button>
        <Button className="mt-3" style={{ background: 'none', border: 'none', marginLeft: '0px' }}>
          <FontAwesomeIcon prefix="far" size='lg'/>
        </Button>
      </Container>
      <Nav className="flex-column" style={{ gap: '10px', marginBottom: '20px' }}>
        <Nav.Item>
          <Nav.Link
            href="#"
            style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'dashboard' ? 'bold' : 'normal' }}
            onClick={() => handleSideNavClick('dashboard')}>
            <FontAwesomeIcon icon={faHouseUser} size='lg'/>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#"
            style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'user' ? 'bold' : 'normal' }}
            onClick={() => handleSideNavClick('user')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#"
            style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'subscription' ? 'bold' : 'normal' }}
            onClick={() => handleSideNavClick('subscription')}>
            <FontAwesomeIcon icon={faFileLines} size='lg'/>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href="#"
            style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'subscription' ? 'bold' : 'normal' }}
            onClick={() => handleSideNavClick('subscription')}>
            <FontAwesomeIcon icon={faUser} size='lg'/>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
    
    </Col>
  );
}

export default MainSidebar;