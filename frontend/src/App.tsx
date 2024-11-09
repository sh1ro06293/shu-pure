import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Registration from './pages/registration';
import Home from './pages/home'; 
import Chat from './pages/chat';
import { UserProvider } from './components/usercontext';

const App = () => {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/chat" element={<Chat />} />

        
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
