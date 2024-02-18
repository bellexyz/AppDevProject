import React from 'react';
import { useNavigate } from 'react-router-dom';
import meloMixLogo from './meloMixLogo.png'; 

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const selectUserType = (userType) => {
    if (userType === 'artist') {
      alert("Artists can't register yet");
    } else {
      navigate(`/signup/${userType}`);
    }
  };

  return ( 
    <div>
      <img src={meloMixLogo} alt="MeloMix Logo" />
      <p>MeloMix</p>
      <h5>Sign Up as:</h5>
      <button onClick={() => selectUserType('listener')}>A Listener</button>
      <button onClick={() => selectUserType('artist')}>An Artist</button>
    </div>
  );
};

export default UserTypeSelection;
