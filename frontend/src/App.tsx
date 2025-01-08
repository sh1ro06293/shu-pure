import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Registration from './pages/registration';
import Home from './pages/home'; 
import Chat from './pages/chat';
import SaveChatRecipe from './pages/saveChatRecipe';
import { UserProvider } from './components/usercontext';
import PrivateRoute from './components/root/privateRoute';
import ChatRecipeHistory from './pages/chatRecipeHistory';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />

          {/* Private Routes */}
          <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/saveChatRecipe/:recipeId" element={<PrivateRoute><SaveChatRecipe /></PrivateRoute>} />
          <Route path="/chatRecipeHistory" element={<PrivateRoute><ChatRecipeHistory /></PrivateRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
