import 'bootstrap/dist/css/bootstrap.min.css';
import meloMixLogo from '../images/meloMixLogo.png';
import profile from '../images/loginImage.png';
import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import 'chartjs-plugin-datalabels';
import { Container, Row, Col, Nav, Image, Button } from 'react-bootstrap';
import '../components/admin.css'
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const existingChart = Chart.getChart(ctx); // Check if a Chart instance already exists
    if (existingChart) {
      existingChart.destroy(); // Destroy existing Chart instance
    }

    // Create new Chart instance
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        datasets: [
          {
            label: 'Free Tier',
            data: [9500, 5100, 2500, 9000, 7000, 150, 2600, 2400, 9000, 10000],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: '#c91029',
            borderWidth: 1.5
          },
          {
            label: 'Tier I',
            data: [5100, 5500, 8200, 2500, 7400, 2600, 7600, 7550, 2700, 7600],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: '#6b1e87', // Tier I color
            borderWidth: 1.5
          },
          {
            label: 'Tier II',
            data: [2700, 8000, 5000, 1000, 700, 2800, 3000, 9100, 9800, 7500],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: '#eb0998',
            borderWidth: 1.5
          }
        ]
      },
      options: {
        layout: {
          padding: {
            left: 5,
            right: 3,
            top: 10,
            bottom: 10,
          }
        },
        scales: {
          y: {
            ticks: {
              stepSize: 2500,
              max: 10000,
              callback: function (value, index, values) {
                if (value === 0 || value === 2500 || value === 5000 || value === 7500 || value === 10000) {
                  return value;
                } else {
                  return '';
                }
              }
            }
          },
          x: {
            barPercentage: 1,
            categoryPercentage: .1,
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });
  }, []);

  const handleSideNavClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  const handleSignOut = () => {
    // Handle sign out logic
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
              <h1 style={{ color: '#FFFFFF', marginLeft: '15px', marginTop: '-15px', fontSize: '25px' }}>Analytics</h1>
            </Container>


            <div className="p-2 d-flex justify-content-end">
              <button className="btn btn-primary" style={{ backgroundColor: 'red', zIndex: 1, marginTop: '-50px', marginBottom: '35px', marginRight: '7px', width: '150px', height: '30px', fontSize: '14px', textAlign: 'center', border: 'none' }}>Filter Options</button>
            </div>
            <div>
              <div style={{ backgroundColor: 'white', width: '685px', marginLeft: '20px', marginTop: '-28px', borderRadius: '5px' }}>
                <canvas id="myChart" style={{ height: '190px', marginBottom: '20px', width: '100%' }}></canvas>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', marginTop: '-300px' }}>
                <div>

                  <div className="flex-grow-1 d-flex flex-column" style={{ height: 'auto', marginTop: '90px', marginRight: '15px' }}>
                    <div className="position-relative" style={{ height: '55px', width: '293px', borderRadius: '5px', backgroundColor: 'white', paddingLeft: '25px', paddingRight: '15px', paddingTop: '5px', paddingBottom: '5px', position: 'relative', marginBottom: '10px' }}>
                      <button className="position-absolute btn btn-sm" style={{ width: '7px', height: '15px', marginTop: '-7px', marginLeft: '5px', backgroundColor: '#c91029', top: '50%', left: '5px', transform: 'translateY(-50%)' }}></button>
                      <div style={{ color: 'black', fontWeight: 'bold', fontSize: '15px', marginLeft: '15px', marginTop: '3px' }}>Free Tier</div>
                      <div style={{ color: 'black', fontSize: '12px', marginLeft: '15px' }}>No. of Listeners</div>

                    </div>
                    <div className="position-relative" style={{ height: '55px', width: '293px', borderRadius: '5px', backgroundColor: 'white', paddingLeft: '25px', paddingRight: '15px', paddingTop: '5px', paddingBottom: '5px', position: 'relative', marginBottom: '10px' }}>
                      <button className="position-absolute btn btn-sm" style={{ width: '7px', height: '15px', marginTop: '-7px', marginLeft: '5px', backgroundColor: '#6b1e87', left: '5px', top: '50%', transform: 'translateY(-50%)' }}></button>
                      <div style={{ color: 'black', fontWeight: 'bold', fontSize: '15px', marginLeft: '15px', marginTop: '3px' }}>Tier I</div>
                      <div style={{ color: '#black', fontSize: '12px', marginLeft: '15px' }}>No. of Listeners</div>
                    </div>
                    <div className="position-relative" style={{ height: '55px', width: '293px', borderRadius: '5px', backgroundColor: 'white', paddingLeft: '25px', paddingRight: '15px', paddingTop: '5px', paddingBottom: '5px', position: 'relative', marginBottom: '10px' }}>
                      <button className="position-absolute btn btn-sm" style={{ width: '7px', height: '15px', marginTop: '-7px', marginLeft: '5px', borderBottom: '1px solid black', backgroundColor: '#eb0998', left: '5px', top: '50%', transform: 'translateY(-50%)' }}></button>
                      <div style={{ color: 'black', fontWeight: 'bold', fontSize: '15px', marginLeft: '15px', marginTop: '3px' }}>Tier II</div>
                      <div style={{ color: '#black', fontSize: '12px', marginLeft: '15px' }}>No. of Listeners</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <hr style={{ border: '1.5px solid white', marginTop: '20px', width: '90%', marginLeft: '47px' }} />

            <div className="d-flex flex-wrap">
              <div style={{ marginBottom: '10px', marginLeft: '130px', marginTop: '10px', width: '30%', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Top Songs</div>
              <div style={{ marginBottom: '10px', marginLeft: '25px', marginTop: '10px', width: '30%', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Top Artists</div>
              <div style={{ marginBottom: '10px', marginLeft: '-54px', marginTop: '10px', width: '30%', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>Top Podcasts/Videocasts</div>

              <div className="col-4 p-2 bg-white mb-3" style={{ marginLeft: '30px', marginTop: '10px', marginRight: '15px', width: '30%', borderRadius: '5px', position: 'relative' }}>
                <div style={{ position: 'relative', marginLeft: '80px', fontWeight: 'bold' }}>
                  Song Name <span style={{ marginTop: '9px', marginLeft: '-62px', position: 'absolute', width: '65px', height: '45px', backgroundColor: '#c9c1c2', top: '50%', transform: 'translateY(-50%)', left: '-15px', borderRadius: '2px' }}></span>
                </div>
                <div style={{ color: '#black', fontSize: '12px', marginLeft: '80px' }}>No. of Streams</div>
              </div>


              <div className="col-4 p-2 bg-white mb-3" style={{ marginRight: '15px', marginTop: '10px', width: '30%', borderRadius: '5px' }}>
                <div style={{ position: 'relative', marginLeft: '80px', fontWeight: 'bold' }}>
                  Artist Name
                  <span style={{ marginTop: '9px', marginLeft: '-62px', position: 'absolute', width: '65px', height: '45px', backgroundColor: '#c9c1c2', top: '50%', transform: 'translateY(-50%)', left: '-15px', borderRadius: '2px' }}></span>
                </div>
                <div style={{ color: '#black', fontSize: '12px', marginLeft: '80px' }}>No. of Streams</div>
              </div>
              <div className="col-4 p-2 bg-white mb-3" style={{ marginRight: '15px', marginTop: '10px', width: '30%', borderRadius: '5px' }}>
                <div style={{ position: 'relative', marginLeft: '80px', fontWeight: 'bold' }}>
                  Podcasts/Videocasts Name
                  <span style={{ marginTop: '9px', marginLeft: '-62px', position: 'absolute', width: '65px', height: '45px', backgroundColor: '#c9c1c2', top: '50%', transform: 'translateY(-50%)', left: '-15px', borderRadius: '2px' }}></span>
                </div>
                <div style={{ color: '#black', fontSize: '12px', marginLeft: '15px', marginLeft: '80px' }}>No. of Listeners</div>
              </div>

              <div className="col-4 p-2 bg-white mb-3" style={{ marginLeft: '30px', marginRight: '15px', width: '30%', borderRadius: '5px' }}>
                <div style={{ position: 'relative', marginLeft: '80px', fontWeight: 'bold' }}>
                  Song Name
                  <span style={{ marginTop: '9px', marginLeft: '-62px', position: 'absolute', width: '65px', height: '45px', backgroundColor: '#c9c1c2', top: '50%', transform: 'translateY(-50%)', left: '-15px', borderRadius: '2px' }}></span>
                </div>
                <div style={{ color: '#black', fontSize: '12px', marginLeft: '15px', marginLeft: '80px' }}>No. of Listeners</div>
              </div>
              <div className="col-4 p-2 bg-white mb-3" style={{ marginRight: '15px', width: '30%', borderRadius: '5px' }}>
                <div style={{ position: 'relative', marginLeft: '80px', fontWeight: 'bold' }}>
                  Artist Name
                  <span style={{ marginTop: '9px', marginLeft: '-62px', position: 'absolute', width: '65px', height: '45px', backgroundColor: '#c9c1c2', top: '50%', transform: 'translateY(-50%)', left: '-15px', borderRadius: '2px' }}></span>
                </div>
                <div style={{ color: '#black', fontSize: '12px', marginLeft: '15px', marginLeft: '80px' }}>No. of Listeners</div>
              </div>
              <div className="col-4 p-2 bg-white mb-3" style={{ marginRight: '15px', width: '30%', borderRadius: '5px' }}>
                <div style={{ position: 'relative', marginLeft: '80px', fontWeight: 'bold' }}>
                  Podcasts/Videocasts Name
                  <span style={{ marginTop: '9px', marginLeft: '-62px', position: 'absolute', width: '65px', height: '45px', backgroundColor: '#c9c1c2', top: '50%', transform: 'translateY(-50%)', left: '-15px', borderRadius: '2px' }}></span>
                </div>
                <div style={{ color: '#black', fontSize: '12px', marginLeft: '15px', marginLeft: '80px' }}>No. of Listeners</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;