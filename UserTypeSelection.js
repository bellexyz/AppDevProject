import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const selectUserType = (userType) => {
    navigate(`/signup/${userType}`);
  };

  return ( 
    <div>
      <h5>User Type</h5>
      <button onClick={() => selectUserType('listener')}>Listener</button>
      <button onClick={() => selectUserType('artist')}>Artist</button>
    </div>
  );
};

export default UserTypeSelection;
