import React, { useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faEye } from '@fortawesome/free-solid-svg-icons';

const AdminArtist = () => {
  const [accounts, setAccounts] = useState([
    { id:   1, name: 'Elle Zia', status: 'unverified' },
    { id:   2, name: 'Ammable', status: 'unverified' },
    { id:   3, name: 'ja', status: 'unverified' },
    { id:   4, name: 'janen ', status: 'unverified' },
    { id:   5, name: 'maria ', status: 'unverified' },
    { id:   6, name: 'Zia', status: 'unverified' },
    { id:   7, name: 'salve', status: 'unverified' },

    // Add more accounts as needed
  ]);

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

  return (
    <Container>
      <Row>
        <Col>
          <h2>Verify Artist</h2>
          <Table striped bordered hover>
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
                      <FontAwesomeIcon icon={faBan} />
                    </Button>
                    <Button onClick={() => handleVerifyClick(account.id)}>
                      Verify
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          <h2>All Accounts</h2>
          <Table striped bordered hover>
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
        </Col>
        <Col>
          <h2>Ban List</h2>
          <Table striped bordered hover>
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
        </Col>
      </Row>
    </Container>
  );
};

export default AdminArtist;

