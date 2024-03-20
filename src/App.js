// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import LandingPage from './components/LandingPage/LandingPage';
import UserTypeSelection from './components/UserTypeSelection/UserTypeSelection';
import AdminUser from './components/AdminUser';
import AdminDashboard from './components/AdminDashboard';
import AdminSubscription from './components/AdminSubscription';
import ListenerDashboard from './ListenerDashboard';
import ArtistDashboard from './ArtistDashboard';
import MusicPlayer from './MusicPlayer';
import ArtistDashboard1 from './ArtistDashboard1';
import ArtistProfile from './ArtistProfile'; 
import UploadArtistAlbum from './UploadArtistAlbum';
import AlbumPage from './AlbumPage';
import GenrePage from './GenrePage';



const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-type-selection" element={<UserTypeSelection />} />
        <Route path="/signup/:userType" element={<SignUp />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} /> 
        <Route path="/AdminUser" element={<AdminUser />} />
        <Route path="/AdminSubscription" element={<AdminSubscription />} /> 
        <Route path="/ListenerDashboard" element={<ListenerDashboard />} /> 
        <Route path="/ArtistAlbumUpload" element={<ArtistDashboard />} /> 
        <Route path="/MusicPlayer" element={<MusicPlayer />} /> 
        <Route path="/ArtistDashboard1" element={<ArtistDashboard1 />} /> 
        <Route path="/ArtistProfile" element={<ArtistProfile />} /> 
        <Route path="/UploadArtistAlbum" element={<UploadArtistAlbum />} /> 
        <Route path="/albums" element={<AlbumPage />} /> 
        <Route path="/genres" element={<GenrePage />} /> 

      </Routes>
    </Router>
  );
};

export default App;