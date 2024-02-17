// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import LandingPage from './components/LandingPage/LandingPage';
import UserTypeSelection from './components/UserTypeSelection/UserTypeSelection';


const App = () => {
  return (
    <Router>
       <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/user-type-selection" element={<UserTypeSelection />} />
        <Route path="/signup/:userType" element={<SignUp />} />
        <Route path="/LandingPage" element={<LandingPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
