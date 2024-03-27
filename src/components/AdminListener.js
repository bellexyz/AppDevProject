import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, Image, Table, Button, ButtonGroup} from 'react-bootstrap';
import '../components/admin.css'


import meloMixLogo from '../images/meloMixLogo.png';
import profile from '../images/loginImage.png';


const AdminListener = () => {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const navigate = useNavigate(); // Move the useNavigate hook inside the component
  const handleSignOut = () => {
    navigate('/login');
  };

  const handleSideNavClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  return (
    <div className="font"style={{ backgroundColor: '#403F3F', minHeight: '100vh', position: 'relative' }}>
      <Container className="d-flex flex-row align-items-center justify-content-start p-1 m-0" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#C70303', minWidth:'100%' }}>
        <Image src={meloMixLogo} alt="MeloMix Logo" style={{ height: '30px', marginRight: '10px', marginLeft: '10px' }}/>
          <h1 style={{ color: 'white', fontSize: '18px', fontWeight:'600', margin: 0 }}>MeloMix</h1>
      </Container>
      <Container fluid >
        <Row>
          <Col sm={2} className="bg-black sidebar mb-2 mt-4" style={{minHeight: '87vh',}}>
            <Container className="d-flex justify-content-left align-items-center mt-3 p-0 m-0 mb-3" style={{gap: '25px'}}>
              <Image src={profile} style={{ height: '65px', marginRight: '10px', marginLeft: '10px' }} />
              <h3 style={{ color: '#FFFFFF', fontSize: '20px' }}>Admin</h3>
            </Container>
            <div className="m-3"style={{ height:'1px', backgroundColor: 'white' }}> </div>
            <Container className="d-flex flex-column justify-content-between mt-3"> 
              <Nav className="flex-column" style={{ gap: '10px', marginBottom: '20px' }}>
                <Nav.Item>
                  <Nav.Link
                    href="#dashboard"
                    style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'dashboard' ? 'bold' : 'normal' }}
                    onClick={() => handleSideNavClick('dashboard')}>Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="#listeners"
                    style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'listeners' ? 'bold' : 'normal' }}
                    onClick={() => handleSideNavClick('listeners')}>Listeners</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="#"
                    style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'artists' ? 'bold' : 'normal' }}
                    onClick={() =>handleSideNavClick('artists')}>Artists</Nav.Link>
                </Nav.Item> 
                <Nav.Item>
                  <Nav.Link
                    href="#podcast"
                    style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'podcast' ? 'bold' : 'normal' }}
                    onClick={() => handleSideNavClick('podcast')}>Podcast/Videocast</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="#subscription"
                    style={{ color: '#FFFFFF', fontWeight: activeNavItem === 'subscription' ? 'bold' : 'normal' }}
                    onClick={() => handleSideNavClick('subscription')}
                  >
                    Subscription
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Button variant="danger align-self-center" style={{ width:'200px', marginTop: '200px' }} size="sm" onClick={handleSignOut}>LOG OUT</Button>
            </Container>
          </Col>
          <Col sm={10} className="main-content mt-5">
            <Container className='d-flex flex-row justify-content-between mb-3'> 
              <h1 style={{color:'#FFFFFF', marginLeft: '15px', fontSize:'30px'}}>Listener</h1>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminListener;