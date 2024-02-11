// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import UserTypeSelection from './UserTypeSelection';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/user-type-selection" element={<UserTypeSelection />} />
        <Route path="/signup/:userType" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
