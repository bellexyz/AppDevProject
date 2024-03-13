import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import MeloMixLogo from './images/meloMixLogo.png';
import ArtistImage from './images/Artist.jpg';
import UploadSongModal from './UploadSongModal';
import { FaPlay, FaStepForward, FaStepBackward, FaRandom, FaVolumeDown, FaExpand, FaSearchPlus } from 'react-icons/fa';
import MainSidebar from './MainSidebar';


const ArtistProfile = () => {
    const [showModal, setShowModal] = useState(false);
    const [uploadedSongTitle, setUploadedSongTitle] = useState('');

    const handleUpload = (title) => {
        setUploadedSongTitle(title);
    };

    return (
        <div className="font" style={{ backgroundColor: '#403F3F', minHeight: '100vh', position: 'relative' }}>
            <Container className="d-flex flex-row align-items-center justify-content-start p-1 m-0" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#C70303', minWidth: '100%' }}>
                <Image src={MeloMixLogo} alt="MeloMix Logo" style={{ height: '30px', marginRight: '10px', marginLeft: '10px' }} />
                <h1 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: 0 }}>MeloMix</h1>
            </Container>
            <Row>
                <MainSidebar />
                <Col sm={8} className="mb-2 mt-4 ml-4">
                    <div style={{ borderRadius: '5px', marginLeft: '20px', backgroundColor: 'white', color: 'black', fontSize: '18px', fontWeight: 'bold', paddingBottom: '65px', paddingLeft: '200px', paddingTop: '10px', width: '105%'}}>
                        Artist Username
                        <div>
                        <div style={{ marginTop: '10px', marginLeft: '20px', color: '#6C757D', fontSize: '14px' }}>
                            <span style={{color: 'black', marginLeft: '-20px', fontWeight: 'normal'}}>Name</span> <br></br>
                            <span style={{color: 'black', marginLeft: '-20px', fontWeight: 'normal'}}>Subscription Tier Level</span> 
                        </div>
                          <span style={{borderRadius: '5px',backgroundColor: '#ada6a6', paddingTop: '90px', paddingBottom: '66px', paddingRight: '155px', paddingLeft: '20px', marginLeft: '-200px'}}></span>
                        </div>
                        <div className="d-flex flex-row">    
                        </div>
                       
                    </div>
                    <div>
                        <div className="d-flex justify-content-between" style={{marginTop: '15px'}}>
                            <div style={{ marginTop: '7px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="text-white font-weight-bold" style={{ marginLeft: '20px', marginRight: '20px' }}>Songs</span>
                                <div>
                                    <button style={{ marginLeft: '90px', border: 'none', backgroundColor: '#d10d27', color: 'white', fontSize: '11px', width: '90px', height: '26px', borderRadius: '3px' }} onClick={() => setShowModal(true)}>Upload Song</button>
                                    <UploadSongModal 
                                        showModal={showModal} 
                                        setShowModal={setShowModal} 
                                        onUpload={handleUpload}
                                    />
                                </div>                 
                            </div> 
                            <span className="text-white font-weight-bold" style={{ marginTop: '10px', marginLeft: '-437px' }}>Albums</span>
                            <button style={{ marginTop: '10px', marginRight: '-60px', border: 'none', backgroundColor: '#d10d27', color: 'white', fontSize: '11px', width: '98px', height: '26px', borderRadius: '3px' }} onClick={() => setShowModal(true)}>Upload Album</button>
                        </div> 
                        <div style={{ borderRadius: '3px', fontWeight: 'bold', fontSize: '11px', color: 'black', backgroundColor: 'white', width: '245px', height: '50px', marginLeft: '20px', marginBottom: '10px', paddingLeft: '70px', paddingTop: '5px' }}>{uploadedSongTitle}Song Title
                        <div> 
                           <span style={{color: 'black', fontWeight: 'normal'}}>Month and Year Released</span>
                                <span style={{borderRadius: '5px',backgroundColor: '#ada6a6', paddingTop: '22px', paddingBottom: '12px', paddingRight: '30px', paddingLeft: '20px', marginLeft: '-215px', }}></span>
                                </div>
                          </div>
                    
                      <div style={{ borderRadius: '3px', fontWeight: 'bold', fontSize: '11px', color: 'black', backgroundColor: 'white', width: '245px', height: '50px', marginLeft: '20px', marginBottom: '10px', paddingLeft: '70px', paddingTop: '5px' }}>{uploadedSongTitle}Song Title                   
                      <div> 
                           <span style={{color: 'black', fontWeight: 'normal'}}>Month and Year Released</span>
                              <span style={{borderRadius: '5px',backgroundColor: '#ada6a6', paddingTop: '22px', paddingBottom: '12px', paddingRight: '30px', paddingLeft: '20px', marginLeft: '-215px', }}></span>
                                </div>
                              <div> 
                        </div>
                       </div>               
                        <div className="d-flex flex-column align-items-center">
                            <div className="d-flex justify-content-between" >
                              
                              <div className="font-weight-bold" style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: 'white', width: '150px', height: '108px', borderRadius: '3px', marginLeft: '380px', marginRight: '10px',  marginTop: '-120px', marginBottom: '10px',  paddingLeft: '8px', paddingRight: '65px', paddingTop: '70px' }}>Album Title
                                <div style={{ marginTop: '1px', marginLeft: '1px', color: '#d9dbde', fontSize: '9px' }}>
                                <span style={{color: 'black', fontWeight: 'normal'}}>Month and Year</span>
                                </div>
                                <div style={{ width: '150px', height: '64px', backgroundColor: '#ada6a6', marginTop: '-100px', marginLeft: '-8px', borderRadius: '5px'}}></div>  
                            </div>

                                <div className="font-weight-bold" style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: 'white', width: '150px', height: '108px', borderRadius: '3px', marginRight: '10px',  marginTop: '-120px', marginBottom: '10px',  paddingLeft: '8px', paddingRight: '65px', paddingTop: '70px' }}>Album Title
                                <div style={{ marginTop: '1px', marginLeft: '1px', color: '#d9dbde', fontSize: '9px' }}>
                                <span style={{color: 'black', fontWeight: 'normal'}}>Month and Year</span>
                                </div>
                                <div style={{ width: '150px', height: '64px', backgroundColor: '#ada6a6', marginTop: '-100px', marginLeft: '-8px', borderRadius: '5px'}}></div>  
                                </div>

                                <div className="font-weight-bold" style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: 'white', width: '150px', height: '108px', borderRadius: '3px', marginRight: '10px',  marginTop: '-120px', marginBottom: '10px',  paddingLeft: '8px', paddingRight: '65px', paddingTop: '70px' }}>Album Title
                                <div style={{ marginTop: '1px', marginLeft: '1px', color: '#d9dbde', fontSize: '9px' }}>
                                <span style={{color: 'black', fontWeight: 'normal'}}>Month and Year</span>
                                </div>
                                <div style={{ width: '150px', height: '64px', backgroundColor: '#ada6a6', marginTop: '-100px', marginLeft: '-8px', borderRadius: '5px'}}></div>  
                                </div>

                                <div className="font-weight-bold" style={{ fontSize: '10px', fontWeight: 'bold', backgroundColor: 'white', width: '150px', height: '108px', borderRadius: '3px', marginRight: '10px',  marginTop: '-120px', marginBottom: '10px',  paddingLeft: '8px', paddingRight: '65px', paddingTop: '70px' }}>Album Title
                                <div style={{ marginTop: '1px', marginLeft: '1px', color: '#d9dbde', fontSize: '9px' }}>
                                <span style={{color: 'black', fontWeight: 'normal'}}>Month and Year</span>
                                </div>
                                <div style={{ width: '150px', height: '64px', backgroundColor: '#ada6a6', marginTop: '-100px', marginLeft: '-8px', borderRadius: '5px'}}></div>  
                                </div>
                            </div>
                        </div>
                        <div style={{ height: '159px', borderLeft: '1px solid red', marginLeft: '290px', marginTop: '-157px'}}></div>
                        <hr style={{ borderColor: 'red',  borderLeft: '1px solid red', borderWidth: '2px', marginLeft: '20px', width: '105%' }} />


                        <div className="d-flex flex-column align-items-center">
                      <div className="d-flex justify-content-between">
                          <span className="text-white font-weight-bold" style={{ marginLeft: '-430px' }}>Podcasts and Videocast</span>
                          <button style={{ marginRight: '-470px', border: 'none', backgroundColor: '#d10d27', color: 'white', fontSize: '11px', height: '26px', borderRadius: '3px' }} onClick={() => setShowModal(true)}>Upload Podcasts and Videocast</button>
                      </div>

                      <div className="d-flex flex-wrap" style={{ marginTop: '8px', width: '112%' }}>
                          <div className="font-weight-bold" style={{ borderRadius: '5px', backgroundColor: 'white', flex: '1', height: '120px', marginLeft: '69px', marginBottom: '10px', paddingLeft: '8px', paddingTop: '80px', fontSize: '11px', fontWeight: 'bold'}}>Podcast/ Videocast
                          <div style={{ marginTop: '1px', marginLeft: '1px', color: '#6C757D', fontSize: '9px' }}>
                                <span style={{color: 'black', fontWeight: 'normal'}}>Month and Year</span>
                                </div>
                                <div style={{ width: '221px', height: '70px', backgroundColor: '#ada6a6', marginTop: '-111px', marginLeft: '-8px', borderRadius: '5px'}}></div>  
                                </div>

                          <div className="font-weight-bold" style={{ borderRadius: '5px', backgroundColor: 'white', flex: '1', height: '120px', marginLeft: '15px', marginBottom: '10px',  paddingLeft: '8px', paddingTop: '80px', fontSize: '11px', fontWeight: 'bold' }}>Podcast/ Videocast
                          <div style={{ marginTop: '1px', marginLeft: '1px', color: '#6C757D', fontSize: '9px' }}>
                                <span style={{color: 'black', fontWeight: 'normal'}}>Month and Year</span>
                                </div>
                                <div style={{ width: '221px', height: '70px', backgroundColor: '#ada6a6', marginTop: '-111px', marginLeft: '-8px', borderRadius: '5px'}}></div>  
                              
                                </div>
                          <div className="font-weight-bold" style={{ borderRadius: '5px', backgroundColor: 'white', flex: '1', height: '120px', marginLeft: '15px', marginBottom: '10px',   paddingLeft: '8px', paddingTop: '80px', fontSize: '11px', fontWeight: 'bold'}}>Podcast/ Videocast
                          <div style={{ marginTop: '1px', marginLeft: '1px', color: '#6C757D', fontSize: '9px' }}>
                                <span style={{color: 'black', fontWeight: 'normal'}}>Month and Year</span>
                                </div>
                                <div style={{ width: '221px', height: '70px', backgroundColor: '#ada6a6', marginTop: '-111px', marginLeft: '-8px', borderRadius: '5px'}}></div>  
                                </div>

                                <div className="font-weight-bold" style={{ borderRadius: '5px', backgroundColor: 'white', flex: '1', height: '120px', marginLeft: '15px', marginBottom: '10px',   paddingLeft: '8px', paddingTop: '80px', fontSize: '11px', fontWeight: 'bold'}}>Podcast/ Videocast
                          <div style={{ marginTop: '1px', marginLeft: '1px', color: '#6C757D', fontSize: '9px' }}>
                                <span style={{color: 'black', fontWeight: 'normal'}}>Month and Year</span>
                                </div>
                                <div style={{ width: '221x', height: '70px', backgroundColor: '#ada6a6', marginTop: '-111px', marginLeft: '-8px', borderRadius: '5px'}}></div>  
                                </div>
                         
                      </div>
                  </div>
                  </div>
                </Col>
                <Col sm={2} className="bg-black sidebar mb-2 mt-4 ml-auto" style={{ minHeight: '84vh', width: '243px', marginLeft: '85px', borderRadius: '5px' }}>
                    <Image src={ArtistImage} alt="Artist Image" style={{ width: '100%', height: 'auto', marginTop: '18px'}} />
                    <div className="text-white mt-4">Whistle</div>
                    <div className="text-white font-weight-normal mt-2" style={{fontSize: '14px'}}>Artist</div>
                    <p className="text-white mt-2" style={{ backgroundColor: 'red', borderRadius: '5px', padding: '8px', paddingBottom: '18px', fontSize: '12px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et libero auctor, vehicula elit at, aliquam elit.</p>
                    <div className="mt-3">
                <input type="range" className="custom-range red-track" id="progressRange" style={{ width: '100%', height: '2px', marginTop: '125px'}} />
                 </div>
                    <div className="d-flex justify-content-between"style={{marginTop: '10px'}} >
                        <FaPlay style={{ color: 'white', fontSize: '17px' }} />
                        <FaStepForward style={{ color: 'white', fontSize: '18px', marginRight: '10px'}} />
                        <FaStepBackward style={{ color: 'white', fontSize: '18px', marginRight: '10px' }} />
                        <FaRandom style={{ color: 'white', fontSize: '15px', marginRight: '10px' }} />
                        <FaExpand style={{ color: 'white', fontSize: '20px', marginRight: '10px' }} />
                        <FaVolumeDown style={{ color: 'white', fontSize: '15px', marginRight: '10px' }} />
                        <div className="d-flex align-items-center" style={{ width: '120px', marginLeft: '10px' }}>
                            <input type="range" className="custom-range red-track" id="volumeRange" style={{ width: '100%', height: '2px', marginLeft: '5px', backgroundColor: 'red'}} />
                        </div>
                    </div>
                </Col>


            </Row>
        </div>
    );
};

export default ArtistProfile;