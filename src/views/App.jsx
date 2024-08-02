import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  CsrfProvider } from './contexts/CsrfContext';
import {  AuthProvider } from './contexts/AuthContext';
import Home from './home';
import Login from './login';
import Register from './register';


function App() {
  return (
    <CsrfProvider>
      <AuthProvider>

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        </Router>
      </AuthProvider>

    </CsrfProvider>
  );
}

export default App;
