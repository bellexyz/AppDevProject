import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, Image, Table, Button, ButtonGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DataTable from 'react-data-table-component';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../components/admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faUserSlash, faUserCheck } from '@fortawesome/free-solid-svg-icons';

import meloMixLogo from '../images/meloMixLogo.png';
import profile from '../images/loginImage.png';

import Sidebar from './Sidebar';

const AdminArtist = () => {
  const [activeTable, setActiveTable] = useState('accounts');
  const [selectedOption, setSelectedOption] = useState('Filter Options');
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const navigate = useNavigate(); // Move the useNavigate hook inside the component
  const [searchText, setSearchText] = useState('');
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: 'elle',
      registration: 'July 9, 2022',
      usertype: 'listener',
      status: 'banned'
    },
    {
      id: 2,
      name: 'nico',
      registration: 'July 24, 2022',
      usertype: 'listener',
      status: 'pending verification'
    },
    {
      id: 3,
      name: 'lesh',
      registration: 'July 1, 2022',
      usertype: 'artist',
      status: 'active'
    },
    {
      id: 4,
      name: 'ja9',
      registration: 'July 20, 2022',
      usertype: 'artist',
      status: 'active'
    },
    {
      id: 5,
      name: 'cla',
      registration: 'July 20, 2022',
      usertype: 'listener',
      status: 'active'
    }
  ]);

  const handleSignOut = () => {
    navigate('/login');
  };

  const handleNavClick = (table, navItem) => {
    setActiveTable(table);
    setActiveNavItem(navItem);
  };

  const handleDropdownSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  const handleSideNavClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  const handleBanClick = (accountId) => {
    setAccounts(accounts.map(account =>
      account.id === accountId ? { ...account, status: 'banned' } : account
    ));
  };

  const handleVerifyClick = (accountId) => {
    setAccounts(accounts.map(account =>
      account.id === accountId ? { ...account, usertype: 'artist', status: 'active' } : account
    ));
  };

  const handleRejectClick = (accountId) => {
    setAccounts(accounts.map(account =>
      account.id === accountId ? { ...account, status: '' } : account
    ));
  };

  const handleUnbanClick = (accountId) => {
    setAccounts(accounts.map(account =>
      account.id === accountId ? { ...account, status: 'active' } : account
    ));
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Registration Date',
      selector: row => row.registration,
      sortable: true,
    },
    {
      name: 'Usertype',
      selector: row => row.usertype,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => <span style={{ color: getStatusColor(row.status) }}>{row.status}</span>
    },
    {
      name: 'Action',
      cell: row => (
        activeTable === 'verify' && row.status === 'pending verification' ? (
          <>
            <Button variant='success' size="sm" onClick={() => handleVerifyClick(row.id)}>
              <FontAwesomeIcon icon={faCheck} /> Verify
            </Button>
            <Button size="sm" variant='danger' onClick={() => handleRejectClick(row.id)}>
              <FontAwesomeIcon icon={faXmark} /> Reject
            </Button>
          </>
        ) : (
          row.status !== 'banned' ?
            <FontAwesomeIcon icon={faUserSlash} onClick={() => handleBanClick(row.id)} style={{ cursor: 'pointer' }} /> :
            <FontAwesomeIcon icon={faUserCheck} onClick={() => handleUnbanClick(row.id)} style={{ cursor: 'pointer' }} />
        )
      ),
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'pending verification':
        return 'orange';
      case 'banned':
        return 'red';
      default:
        return 'black';
    }
  };

  const [records, setRecords] = useState(accounts);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filter accounts based on search text
  const filteredAccounts = accounts.filter(account =>
    Object.values(account).some(val =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const breadcrumbItems = {
    dashboard: 'Dashboard',
    listeners: 'Listeners',
    artists: 'Artists',
    podcast: 'Podcast/Videocast',
    subscription: 'Subscription',
    all: 'All',
    activeAccounts: 'Active Accounts',
    verifyArtist: 'Verify Artist',
    banList: 'Ban List',
  };

  const getBreadcrumbPath = () => {
    let path = `Admin / ${breadcrumbItems[activeNavItem]}`;
    if (activeNavItem === 'artists') {
      path += ` / ${breadcrumbItems[activeTable]}`;
    }
    return path;
  };

  return (
    <div className="font" style={{ backgroundColor: '#403F3F', minHeight: '100vh', position: 'relative' }}>
      <Container className="d-flex flex-row align-items-center justify-content-start p-1 m-0" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#C70303', minWidth: '100%' }}>
        <Image src={meloMixLogo} alt="MeloMix Logo" style={{ height: '30px', marginRight: '10px', marginLeft: '10px' }} />
        <h1 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>MeloMix</h1>
      </Container>
      <Container fluid>
        <Row>
          <Sidebar />
          <Col sm={10} className="main-content mt-5">
            <Container className='d-flex flex-row justify-content-between mb-3'>
              {/* Breadcrumb */}
              <div style={{ color: '#FFFFFF', marginLeft: '15px', fontSize: '20px' }}>
                Admin / {breadcrumbItems[activeNavItem]} / {breadcrumbItems[activeTable]} {/* Dynamic breadcrumb */}
              </div>
              {/* End of Breadcrumb */}
              <h1 style={{ color: '#FFFFFF', marginLeft: '15px', fontSize: '30px' }}>USERS</h1>
            </Container>
            {/* Navigation */}
            <Nav variant="underline" className="flex-row" style={{ marginLeft: '10px' }}>
              {/* Nav links with onClick handlers */}
              <Nav.Item>
                <Nav.Link style={{ color: 'white', marginLeft: '15px' }} href="#accounts" onClick={() => handleNavClick('accounts', 'dashboard')}>All</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{ color: 'white', marginLeft: '15px' }} href="#active" onClick={() => handleNavClick('active', 'listeners')}>Active Accounts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{ color: 'white', marginLeft: '15px' }} href="#verification" onClick={() => handleNavClick('verify', 'artists')}>Verify Artist</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{ color: 'white', marginLeft: '15px' }} href="#banlist" onClick={() => handleNavClick('banlist', 'podcast')}>Ban List</Nav.Link>
              </Nav.Item>
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchText}
                onChange={handleSearchChange}
                style={{ marginBottom: '0px', borderRadius: '20px', padding: '5px' }}
              />
            </Nav>
            {/* Render only the active table */}
            {activeTable === 'accounts' && (
              <div className="m-4 p-0 m-0 custom-table" style={{ borderRadius: '5px', overflow: 'hidden', height: '75%', backgroundColor: 'white' }}>
                <DataTable
                  columns={columns}
                  data={filteredAccounts}
                  searchable={true}
                  pagination
                  striped
                  highlightOnHover
                  pointerOnHover
                />
              </div>
            )}
            {activeTable === 'active' && (
              <div className="m-4 p-0 m-0 custom-table" style={{ borderRadius: '5px', overflow: 'hidden', height: '75%', backgroundColor: 'white' }}>
                <DataTable
                  columns={columns}
                  data={filteredAccounts.filter(account => account.status === 'active')}
                  searchable={true}
                  pagination
                  striped
                  highlightOnHover
                  pointerOnHover
                />
              </div>
            )}

            {activeTable === 'verify' && (
              <div className="m-4 p-0 m-0 custom-table" style={{ borderRadius: '5px', overflow: 'hidden', height: '75%', backgroundColor: 'white' }}>
                <DataTable
                  columns={columns}
                  data={filteredAccounts.filter(account => account.status === 'pending verification')}
                  searchable={true}
                  pagination
                  striped
                  highlightOnHover
                  pointerOnHover
                />
              </div>
            )}

            {activeTable === 'banlist' && (
              <div className="m-4 p-0 m-0 custom-table" style={{ borderRadius: '5px', overflow: 'hidden', height: '75%', backgroundColor: 'white' }}>
                <DataTable
                  columns={columns}
                  data={filteredAccounts.filter(account => account.status === 'banned')}
                  searchable={true}
                  pagination
                  striped
                  highlightOnHover
                  pointerOnHover
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminArtist;
