import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, Image, Table, Button, ButtonGroup} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../components/admin.css'
import { faBan, faEye, faWindowRestore, faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faIconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import meloMixLogo from '../images/meloMixLogo.png';
import profile from '../images/loginImage.png';


const AdminArtist = () => {
  const [activeTable, setActiveTable] = useState('accounts');
  const [selectedOption, setSelectedOption] = useState('Filter Options');
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setAccounts(response.data);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  
  const navigate = useNavigate(); // Move the useNavigate hook inside the component
  const handleSignOut = () => {
    navigate('/login');
  };
  const handleNavClick = (table) => {
    setActiveTable(table);
  };
  const handleDropdownSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };
  
  const handleSideNavClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  const handleEyeClick = () => {
    // Handle eye icon click
    console.log('Monitor Button');
  };
  const handleCheckClick =() => {
    // Handle check icon click
    console.log('Check Button');
  }
  const handleBanClick = (accountId) => {
    setAccounts(accounts.map(account =>  
      account.id === accountId ? { ...account, status: 'banned' } : account
    ));
  };

  const handleVerifyClick = (accountId) => {
    setAccounts(accounts.map(account =>  
      account.id === accountId ? { ...account, status: 'verified' } : account
    ));
  };

  const handleRejectClick = (accountId) => {
    setAccounts(accounts.map(account =>  
      account.id === accountId ? { ...account, status: 'verification rejected' } : account
    ));
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
              <h1 style={{color:'#FFFFFF', marginLeft: '15px', fontSize:'30px'}}>Artist</h1>
              <Dropdown as={ButtonGroup} style={{ width:'200px', maxHeight: '30px'}} onSelect={handleDropdownSelect}>
                <Button variant="danger" style={{ fontSize:'13px', padding:'10px !important'}} className='p-1'>{selectedOption}</Button>
                <Dropdown.Toggle split className='p-1' variant="danger" id="dropdown-custom-2" style={{ minWidth:'20px',}}/>
                <Dropdown.Menu style={{ fontSize:'13px', minWidth: '100%', textAlign: 'left' }}>
                  <Dropdown.Item eventKey="Name" active={selectedOption === 'Name'}>Name</Dropdown.Item>
                  <Dropdown.Item eventKey="Date" active={selectedOption === 'Date'}>Date</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Container>
            <Nav variant="underline" className="flex-row" style={{marginLeft:'10px'}}>
              <Nav.Item>
                <Nav.Link style={{ color: 'white', marginLeft: '15px'}} href="#accounts" onClick={() => handleNavClick('accounts')} active={activeTable === 'accounts'}>Accounts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{ color: 'white', marginLeft: '15px'}} href="#verification" onClick={() => handleNavClick('verify')} active={activeTable === 'verify'}>Verify Artist</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{ color: 'white', marginLeft: '15px'}} href="#banlist"  eventKey="link-1" onClick={() => handleNavClick('banlist')} active={activeTable === 'banlist'}>Ban List</Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Render only the active table */}
            {activeTable === 'accounts' && (
            <div className="m-4 p-0 m-0 custom-table" style={{ borderRadius: '5px', overflow: 'hidden', height: '75%', backgroundColor: 'white' }}>
              <Table striped bordered hover className="custom-table m-0 p-0">
              <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.id}>
                  <td>{account.name}</td>
                  <td>{account.status}</td>
                </tr>
              ))}
            </tbody>
              </Table>
            </div>
            )}

            {activeTable === 'verify' && (
            <div className="m-4 p-0 m-0 custom-table" style={{ borderRadius: '5px', overflow: 'hidden', height: '75%', backgroundColor: 'white' }}>
              <Table striped bordered hover className="custom-table m-0 p-0">
              <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts.filter(account => account.status === 'unverified').map(account => (
                <tr key={account.id}>
                  <td>{account.name}</td>
                  <td>
                    <Button onClick={() => handleBanClick(account.id)}>
                      Ban
                    </Button>
                    <Button onClick={() => handleVerifyClick(account.id)}>
                      Verify
                    </Button>
                    <Button onClick={() => handleRejectClick(account.id)}>
                Reject
              </Button>
                  </td>
                </tr>
              ))}
             
            </tbody>
              </Table>
            </div>
            )}

            {activeTable === 'banlist' && (
             <div className="m-4 p-0 m-0 custom-table" style={{ borderRadius: '5px', overflow: 'hidden', height: '75%', backgroundColor: 'white' }}>
              <Table striped bordered hover className="custom-table m-0 p-0">
              <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {accounts.filter(account => account.status === 'banned').map(account => (
                <tr key={account.id}>
                  <td>{account.name}</td>
                </tr>
              ))}
            </tbody>
              </Table>
            </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminArtist;